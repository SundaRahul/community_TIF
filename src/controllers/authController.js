import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import User from "../models/User.js";
import { Snowflake } from "@theinternetfolks/snowflake";


export const signup= async (req,res)=>{

    const {name,email,password}=req.body;

    if(!name||!email||!password){
        return res.status(400).json({error:"All fields are required"});
    }

    const existUser=await User.findOne({email});
    if(existUser){
        return  res.status(400).json({error:"User already exist"});
    }

    const hashedPassword=await bcrypt.hash(password,10);

    const user=await User.create({
        id:Snowflake.generate(),
        name,
        email,
        password:hashedPassword
    });
    const token=jwt.sign({_id:user._id},process.env.JWT_SECRET,{expiresIn:'1h'});

    res.status(201).json({message:'User registred successfully',user,token});
};

export const signin=async (req,res)=>{

    const{email,password}=req.body;

    const user=await User.findOne({email});

    if(!user){
            return res.status(400).json({error:"User not registred"});
    }

    const isPasswordValid=await bcrypt.compare(password,user.password);

    if(!isPasswordValid){
        return res.status(400).json({error:'Invalid Credentials'});
    }

    const token=jwt.sign({_id:user._id},process.env.JWT_SECRET,{expiresIn:'1h'});

    res.status(200).json({message:'Login Successfully',token});
}

export const getMe=async (req,res)=>{
    const user=await User.findById(req.user.id).select('-password');
    res.status(200).json({user});
};
