import Community from "../models/Community.js";
import Member  from "../models/Member.js";
import Role from "../models/Role.js"
import { Snowflake } from "@theinternetfolks/snowflake";

const generateSlug = (name) => name.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '');


export const createCommunity=async(req,res)=>{

    const {name}=req.body;

    if(!name){
        return res.status(400).json({error:"Provide the community name"});
    }

    const slug=generateSlug(name);

    const existingCommunity=await Community.findOne({slug});

    if(existingCommunity){
        return res.status(400).json({error:"Community with the name already exist"});
    }


    const community= await Community.create({
        _id:Snowflake.generate(),
        name,
        slug,
        owner:req.user?._id
    });

    const adminRole=await Role.findOne({name:'Community Admin'});

    await Member.create({
        _id:Snowflake.generate(),
        community:community._id,
        user:req.user._id,
        role:adminRole._id
    });

    res.status(201).json({message:'community created successfully',community});

};

export const getAllCommunities = async (req, res) => {
    const communities = await Community.find();
    res.status(200).json({ communities });
};

export const getAllMembers=async (req,res)=>{

    const {_id}=req.params;
    const members =await Member.find({community:_id}).populate('user role');
    res.status(200).json({members});
}

export const getMyOwnedCommunities= async (req,res)=>{

    const communities=await Community.find({owner:req.user._id});
    res.status(200).json({communities});
};

export const getMyJoinedCommunities=async(req,res)=>{
    const joinedCommunities=await Member.find({user:req.user.id}).populate('community');
    res.status(200).json({joinedCommunities});
}