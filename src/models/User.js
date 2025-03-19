import mongoose from "mongoose";
import { Snowflake } from "@theinternetfolks/snowflake";

const userSchema = new mongoose.Schema({
    _id: {
        type: String,
        default: () => Snowflake.generate(),
        unique:true
    },
    name: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        maxlength: 64
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.model('User', userSchema);
