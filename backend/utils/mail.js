exports.generateOTP = (otp_length = 6 )=> {
     // generate 6 digit otp
     let OTP = '';
     for (let i=1; i<=otp_length; i++){
         const randomVal = Math.round(Math.random()*9);
         OTP += randomVal;
     }

     return OTP;
}

exports.generateMailTransporter = () => nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "e25771f3d29c91",
      pass: "3a362cc2a74018"
    }
  });