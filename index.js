const express = require("express");
const mongoose = require('mongoose');
const todoHandler = require("./routeHandler/todoHandler");

const app = express();
app.use(express.json());

//dtabase connection with mongoose
mongoose.connect("mongodb://localhost/todos")
.then(() => console.log("mongodb connection succesful"))
.catch(err => console.log(err))
//end

//application route
app.use("/todo",todoHandler);
//


function errorHandler(err,req,res,next){
if (res.headersSent) {
    return next(err);
}
res.status(500).json({error:err});
}

app.listen(3000,() =>{
    console.log("app listening at port 3000");
});