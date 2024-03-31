import mongoose from "mongoose"
import GENRE_MODEL from "../model/GENRE_MODEL.js"


export const createGenre = async(name, res) => {
    if(!name){
        res.status(404)
        throw new Error('Name of genre is required!')
    }

    const genderExist = await GENRE_MODEL.findOne({name})

    if(genderExist){
        res.status(409)
        throw new Error('Genre all ready have!')
    }

    const genre = await GENRE_MODEL.create({name})

    return genre
}

export const updateGenre = async(name, id, res) => {
    if(!name){
        res.status(400)
        throw new Error('Name of genre is required!')
    }

    const genderExist = await GENRE_MODEL.findOne({name})

    if(genderExist){
        res.status(409)
        throw new Error('Genre all ready have!')
    }
    const genre = await GENRE_MODEL.findByIdAndUpdate(id,{$set:{name}}, {new:true})

    return genre
}

export const deleteGenre = async(id, res) => {

    const genre = await GENRE_MODEL.findByIdAndDelete(id)

    return genre
}

export const getAllGenrePagination = async(page = 1, limit = 5) => {
    const skip = (page - 1) * limit;

    //countDocuments get total count off collection
    const totalCount = await GENRE_MODEL.countDocuments(); 

    // devide the totalcount in limit which is 5
    const totalPages = Math.ceil(totalCount / limit);

    const genre = await GENRE_MODEL.find().skip(skip).limit(limit)

    return {data:genre, totalCount, totalPages}
}

export  const getAllGenre = async() => {

    const genre = await GENRE_MODEL.find()

    return genre
}


export  const getGenreById = async(id, res) => {
    if(!mongoose.isValidObjectId(id)){
        res.status(400)
        throw new Error('Invalid Id')
    }
    const genre = await GENRE_MODEL.findById(id)
    return genre
}