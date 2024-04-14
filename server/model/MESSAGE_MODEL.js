import mongoose, { Schema, model } from "mongoose";

const messageSchema = new Schema({
    sender: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    receiver: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    content: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['unread', 'read'], // Status can be either 'unread' or 'read'
        default: 'unread' // By default, messages are unread
    }
},{timestamps:true});

export default model('messages', messageSchema)

