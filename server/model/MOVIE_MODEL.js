import mongoose, { Schema, model } from 'mongoose'
import GENRE_MODEL from './GENRE_MODEL.js';


const reviewSchema = mongoose.Schema(
  {
    name: {
       type      : String,
        required : true
    },
    rating: { 
      type       : Number,
      required   : true
    },
    comment: {
       type      : String, 
       required  : true
    },
    user: {
      type       : mongoose.Schema.Types.ObjectId,
      required   : true,
      ref        : "User",
    },
  },
  { timestamps   : true }
);

const movieSchema = new Schema({
    name:{
      type     : String,
     
    },
    image:{
      type     : String
    },
    year:{ 
      type     : Number,
    
    },
    genre:{
      type     : mongoose.Schema.Types.ObjectId,
      ref      : GENRE_MODEL,
      
    },
    detail:{
      type     : String,
      
    },
    cast:{
      type     : [{type:String}],
      
    },
    reviews:[reviewSchema],
    numReviews:{
      type     : Number,
      default  : 0
    },
    createdAt:{
      type     : Date, 
      default  : Date.now
    }  
},{timestamps  :true})

export default model('Movie', movieSchema)