import Role from "../models/Role.js";
import { Snowflake } from "@theinternetfolks/snowflake";


export const createRole=async (req,res)=>{

    const {name}=req.body;

    if(!name){
        return res.status(400).json({error:"Role Field is required"});
    }

    const existingRole=await Role.findOne({name});

    if(existingRole){
        return res.status(400).json({
            error:"Role Already exist"
        })
    }

    const newRole = await Role.create({
        _id:Snowflake.generate(),
        name
    })

    res.status(201).json({
        status:true,
        content: {
            data: newRole
        }
    })

};

export const getAllRoles = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = 10;

    const total = await Role.countDocuments();
    const roles = await Role.find()
        .skip((page - 1) * limit)
        .limit(limit);

    res.status(200).json({
        status: true,
        content: {
            meta: {
                total,
                pages: Math.ceil(total / limit),
                page
            },
            data: roles
        }
    });
};