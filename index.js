const express = require("express");
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const todoHandler = require("./routeHandler/todoHandler");
const userHandler = require("./routeHandler/userHandler");

const app = express();
dotenv.config();
app.use(express.json());

//dtabase connection with mongoose
mongoose.connect("mongodb://localhost/todos")
.then(() => console.log("mongodb connection succesful"))
.catch(err => console.log(err))
//end

//application route
app.use("/todo",todoHandler);
app.use("/user",userHandler);
//


const  errorHandler = (err,req,res,next) =>{
if (res.headersSent) {
    return next(err);
}
res.status(500).json({error:err});
}
app.use(errorHandler);

app.listen(3000,() =>{
    console.log("app listening at port 3000");
});