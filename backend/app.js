const express = require("express");
const userRouter = require('./routes/user');
const app = express();

app.use(userRouter);

app.listen(3000, ()=>{
    console.log("The server is successfully connected to port 3000");
});