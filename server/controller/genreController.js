import asyncHandler from 'express-async-handler';
import * as genreServices from '../services/genreServices.js'


export const createGenre = asyncHandler(async(req, res) => {

    const{name} = req.body

    const data = await genreServices.createGenre(name, res)

    res.status(201).json(data)
})

export const updateGenre = asyncHandler(async(req, res) => {
    const{id} = req.params
    const{name} = req.body

    const data = await genreServices.updateGenre(name, id, res)

    res.status(200).json(data)
})

export const deleteGenre = asyncHandler(async(req, res) => {
    const {id} = req.params

    await genreServices.deleteGenre(id)

    res.status(200).json({message:'sucessfull deleted'})
})

export const getAllGenre = asyncHandler(async(req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;

   const {data, totalCount, totalPages} = await genreServices.getAllGenre(page, limit)

    res.status(200).json({ totalCount,totalPages,data})
})


export const getGenreById = asyncHandler(async(req,res) => {
    const{id} = req.params

    const data = await genreServices.getGenreById(id,res)

    res.status(200).json(data)
})