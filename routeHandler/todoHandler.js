const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

const todoSchema = require('./schemas/todoSchema');
const Todo = new mongoose.model("Todo",todoSchema);




//get all todos
router.get("/", async(req,res)=>{
await Todo.find({status:'active'},(err,data)=>{
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
//get a todos by id
router.get("/:id", async(req,res)=>{
    await Todo.find({_id:req.params.id},(err,data)=>{
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

router.post("/", async(req,res)=>{
const newTodo = new Todo(req.body);
await newTodo.save((err) =>{
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
router.post("/:all", async(req,res)=>{
await Todo.insertMany(req.body, (err)=>{
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

router.put("/:id", async(req,res)=>{
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

router.delete("/:id", async(req,res)=>{
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