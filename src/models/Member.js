import mongoose from "mongoose";
import { Snowflake } from "@theinternetfolks/snowflake";

const memberSchema=new mongoose.Schema({
    _id: {
        type: String,
        default: () => Snowflake.generate(),
        unique: true
    },
    community: {
        type: String,
        ref: 'Community',
        required: true
    },
    user: {
        type: String,
        ref: 'User',
        required: true
    },
    role: {
        type: String,
        ref: 'Role',
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now
    }
})

export default mongoose.model('Member', memberSchema);
