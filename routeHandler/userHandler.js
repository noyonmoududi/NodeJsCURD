const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const router = express.Router();

const userSchema = require('./schemas/userSchema');
const User = new mongoose.model("User",userSchema);

//signup
router.post("/signup",async(req,res)=>{
    try {
        const hashPassword =await bcrypt.hash(req.body.password,10);
        const newUser = new User({
            name:req.body.name,
            username:req.body.username,
            password:hashPassword
        });
        await newUser.save();
        res.status(200).json({
            message:"signUp was successfully."
        });  
    } catch {
        res.status(500).json({
            message:"sign up failed!."
        });
    }
});

//login
router.post("/login",async(req,res)=>{
    try {
        const user = await User.find({
            username:req.body.username,
        });
        if (user && user.length >0) {
            const isValidPassword = await bcrypt.compare(req.body.password,user[0].password);
            if (isValidPassword) {
            //generate token
            var token = jwt.sign({
                 username: user[0].username,
                 userId :user[0]._id
                }, process.env.JWT_SECRATE,{
                    expiresIn:'1h'
                });
                res.status(200).json({
                    "assess_token": token,
                    "message" :"login was successfully."
                });
            }else{
                res.status(401).json({
                    message:"Authentication failed!."
                });
            }
            
        }else{
            res.status(401).json({
                message:"Authentication failed!."
            });
        }
          
    } catch {
        res.status(401).json({
            message:"Authentication failed!."
        });
    }
});

module.exports= router;