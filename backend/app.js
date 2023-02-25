const express = require("express");
require("express-async-errors");
const morgan = require("morgan");
const { errorHandler } = require("./middlewares/error");
require("dotenv").config();
require("./db");
const userRouter = require('./routes/user');
const app = express();

app.use(express.json());
app.use(morgan("dev"));
app.use("/api/user",userRouter);

app.use(errorHandler);

app.listen(8000, ()=>{
    console.log("The server is successfully connected to port 8000");
});