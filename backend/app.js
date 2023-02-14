const express = require("express");
require("./db");
const userRouter = require('./routes/user');
const app = express();

app.use(express.json());
app.use("/api/user",userRouter);

app.listen(3000, ()=>{
    console.log("The server is successfully connected to port 3000");
});