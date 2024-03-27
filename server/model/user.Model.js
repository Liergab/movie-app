import mongoose, { Schema, model } from "mongoose";

const userSchema = new Schema({
    username:{
        type:String
    },
    email:{
        type:String
    },
    password:{
        type:String
    },
    isAdmin:{
        type:Boolean,
        default:false
    }
},{timestamps:true})

export default model('users', userSchema)