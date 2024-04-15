import mongoose, { Schema, model } from "mongoose";

const messageSchema = new Schema({
    conversationId: {
        type: String,
      },
      sender: {
        type: String,
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

