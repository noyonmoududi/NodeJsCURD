const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

const todoSchema = require('./schemas/todoSchema');
const Todo = new mongoose.model("Todo",todoSchema);

const checkLogin = require("../middlewares/checkLogin");




//get all todos
router.get("/",checkLogin,(req,res)=>{
 Todo.find({status:'active'},(err,data)=>{
    if(err){
        res.status(500).json({
            error:"There was a server side error!"
        });
    }else{
        res.status(200).json({
            result:data,
            message:"Find All Data From database."
        });
    }
})
});

//get active todos
router.get("/active",async(req,res)=>{
    const todo = new Todo();
    const data = await todo.findActive();
    res.status(200).json({
        data,
    });
});
//get active todos with callBack
router.get("/active-callback",(req,res)=>{
    const todo = new Todo();
    todo.findActiveCallBack((err,data)=>{
        res.status(200).json({
            data,
        });
    });
});
//get statics 
router.get("/js",async(req,res)=>{
    const data = await Todo.findActive();
    res.status(200).json({
        data,
    });
});
//get query helper 
router.get("/language",async(req,res)=>{
    const data = await Todo.find().byLanguage("js");
    res.status(200).json({
        data,
    });
});
//get a todos by id
router.get("/:id",(req,res)=>{
     Todo.find({_id:req.params.id},(err,data)=>{
        if(err){
           res.status(500).json({
                error:"There was a server side error!"
            });
        }else{
            res.status(200).json({
                result:data,
                message:"Find All Data From database."
            });
        }
    })
});

router.post("/", (req,res)=>{
const newTodo = new Todo(req.body);
 newTodo.save((err) =>{
    if(err){
        res.status(500).json({
            error:"There was a server side error!"
        });
    }else{
        res.status(200).json({
            message:"Todo was inserted successfully."
        });
    }
})
});
//multiple todo save
router.post("/:all", (req,res)=>{
 Todo.insertMany(req.body, (err)=>{
if (err) {
    res.status(500).json({
        error:"There was a server side error!"
    });
} else {
    res.status(200).json({
        message:"Todos ware inserted successfully."
    });
}
})
});

router.put("/:id",(req,res)=>{
var result =  Todo.findOneAndUpdate({ _id: req.params.id }, {$set:{status:'active'}}, { new: true,useFindAndModify:false }, (err, doc) => {
    if (!err) {
                 res.status(200).json({
                     message:"Todo ware updated successfully."
                 }); }
    else {
               res.status(500).json({
            error:"There was a server side error!"
        });
    }
});
console.log(result);
});

router.delete("/:id",(req,res)=>{
 Todo.deleteOne({_id:req.params.id},(err)=>{
        if(err){
            res.status(500).json({
                error:"There was a server side error!"
            });
        }else{
            res.status(200).json({
                message:"deleted success"
            });
        }
    })
});

module.exports= router;