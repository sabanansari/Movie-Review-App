const nodemailer = require('nodemailer');
const User = require('../models/user');
const EmailVerificationToken = require('../models/emailVerificationToken');
const { isValidObjectId } = require('mongoose');
const { generateOTP, generateMailTransporter } = require('../utils/mail');
const { sendError } = require('../utils/helper');

exports.create = async (req,res) => {
    const {name, email, password} = req.body;

    const oldUser = await User.findOne({email});

    if(oldUser) return sendError(res,"This email is already in use!");

    const newUser =  new User({name,email,password});
    await newUser.save();

    // generate 6 digit otp
    let OTP = generateOTP();

    // store OTP in our db
    const newEmailVerificationToken = new EmailVerificationToken({
        owner:newUser._id,
        token: OTP,
    })

    await newEmailVerificationToken.save();

    // send otp to user

    var transport = generateMailTransporter();

      transport.sendMail({
        from:'verification@reviewapp.com',
        to: newUser.email,
        subject: 'Email Verification',
        html: `
        <p>Your verification OTP</p>
        <h1> ${OTP} </h1>
        `
    });

    res.status(201).json({message: "Please verify your email. OTP has been sent to your email account!"});
}

exports.verifyEmail = async (req,res)=>{
    const {userId,OTP} = req.body;

    if(!isValidObjectId(userId)) return sendError(res, 'Invalid user!');

    const user = await User.findById(userId);

    if(!user) return sendError(res,'User not found!',404);

    if(user.isVerified) return sendError(res,'User is already verified!');

    const token = await EmailVerificationToken.findOne({owner:userId});

    if(!token) return sendError(res, 'Token not found!',404);

    const isMatched = await token.compareToken(OTP);
    if(!isMatched) return sendError(res,'Please submit a valid OTP!');

    user.isVerified = true;
    await user.save();

    EmailVerificationToken.findByIdAndDelete(token._id);

    var transport = generateMailTransporter();

      transport.sendMail({
        from:'verification@reviewapp.com',
        to: user.email,
        subject: 'Welcome',
        html: '<h1>Welcome</h1>'
    });

    res.json({message: 'Your email is verified.'});

}


exports.resendEmailVerificationToken = async (req,res) => {
    const {userId} = req.body;

    const user = await User.findById(userId);

    if(!user) return sendError(res,'User not found!',404);

    if(user.isVerified) return sendError(res,'This email id is already verified!');

    const alreadyHasToken = await EmailVerificationToken.findOne({owner:userId});

    if(alreadyHasToken) return sendError(res,'Only after an hour you can request for another token!');

     // generate 6 digit otp
     let OTP = generateOTP();
 
     // store OTP in our db
     const newEmailVerificationToken = new EmailVerificationToken({
         owner:user._id,
         token: OTP,
     })
 
     await newEmailVerificationToken.save();
 
     // send otp to user
 
     var transport = generateMailTransporter();
 
       transport.sendMail({
         from:'verification@reviewapp.com',
         to: user.email,
         subject: 'Email Verification',
         html: `
         <p>Your verification OTP</p>
         <h1> ${OTP} </h1>
         `
     });

     res.json({message: 'New OTP has been sent to your registered email account'});

}