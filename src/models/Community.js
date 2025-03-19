import mongoose from "mongoose";
import { Snowflake } from "@theinternetfolks/snowflake";

const communitySchema =new mongoose.Schema({
    _id:{
        type:String,
        default :()=>Snowflake.generate(),
        unique:true
    },
    name:{
        type:String,
        required:true,
    },
    slug:{
        type:String,
        required:true,
        unique:true
    },
    owner:{
        type:String,
        ref:'User',
        required:true
    },
    created_at:{
        type:Date,
        default:Date.now
    },
    updated_at:{
        type:Date,
        default:Date.now
    }
})

export default mongoose.model('Community',communitySchema);