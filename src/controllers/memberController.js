import Member from "../models/Member.js";
import Community from "../models/Community.js";
import Role from "../models/Role.js";
import { Snowflake } from "@theinternetfolks/snowflake";


const isAuthrized=async(userId,communityId,allowedRoles)=>{

    const member= await Member.findOne({community:communityId,user:userId}).populate('role');

    return member&&allowedRoles.include(member.role.name);
}

export const addMember= async(req,res)=>{

    const {community,user,role}=req.body;

    if(!community||!uesr||!role){
        return res.status(400).json({error:"Not enough details"});
        
    }

    const communityExist=await Community.findOne(community);
    
    if(!communityExist){
        return res.status(400).json({error:"Community Doesn't exist"});
    }

    const isAdmin=isAuthrized(req.user._id,community,['Community Admin']);

    if(!isAdmin){
        return res.status(400).json({error:"Access Not Allowed"});
    }

    const existMember=await Member.findOne({community,user});
    if(existMember){
        return res.status(400).json({error:"User Already exist"});
    }
    
    const newMember= await Member.create({
        _id:Snowflake.generate(),
        community,
        user,
        role
    });

    res.status(201).json({
        status: true,
        content: { data: newMember }
    });
};

export const removeMember=async(req,res)=>{

    const {id}=req.params;

    const member=await Member.findOne({_id:id});

    if(!member){
        return res.status(400).json({error:"The Member Doesn't exist"})
    }

    const isAuthorizedUser = await isAuthrized(req.user._id, member.community, ['Community Admin', 'Community Moderator']);
    if (!isAuthorizedUser) {
        return res.status(403).json({ status: false, error: 'NOT_ALLOWED_ACCESS' });
    }

    await Member.findByIdAndDelete({_id:id});

    res.status(200).json({status:true});
}