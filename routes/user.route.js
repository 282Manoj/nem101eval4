const express = require("express");
const UserRouter=express.Router();
const {UserModel}=require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt=require("jsonwebtoken");


UserRouter.post("/register",async(req,res)=>{
    const {email,pass,name,age}=req.body;
    try {
        bcrypt.hash(pass,5,async(err,secure_password)=>{
            if(err){
                console.log(err);
            }
            else{
                const user=new UserModel({email,pass:secure_password,name,age});
                await user.save();
                res.send("Registered");
            }
        });
    } catch (error) {
        res.send("Error in registering the user");
        console.log(error);
    }
})

UserRouter.post("/login",async(req,res)=>{
   const {email,pass}=req.body;
//    console.log(email,pass);
   try {
    const user=await UserModel.find({email});
    // console.log("user",user)
    const hash_pass=user[0].pass;
    console.log("hash_pass",hash_pass)
    if(user.length>0){
        bcrypt.compare(pass,hash_pass,(err,result)=>{
            if(result){
                const token=jwt.sign({userID:user[0]._id},"masai");
                res.send({"msg":"Login Successfull","token":token});
            }
            else{
                res.send("Wrong credentials");
            }
        })
    }
    else{
        res.send("Wrong credentials");
    }
   } catch (error) {
    res.send("Something went wrong");
    console.log(error)
   }
})

module.exports={
    UserRouter
}