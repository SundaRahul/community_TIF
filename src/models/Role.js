import mongoose from 'mongoose';
import { Snowflake } from '@theinternetfolks/snowflake';

const roleSchema = new mongoose.Schema({
    _id: {
        type: String,
        default: () => Snowflake.generate(),
        unique: true
    },
    name: {
        type: String,
        maxlength: 64,
        required: true,
        unique: true
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

export default mongoose.model('Role', roleSchema);
