import mongoose, { Schema, model } from 'mongoose'

const genreSchema = new Schema({
  name:{
    type:String,
    trim:true,
    required:true,
    maxLength:32,
    unique:true
  }
})

export default model('genre', genreSchema)