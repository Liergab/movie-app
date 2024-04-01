import asyncHandler from 'express-async-handler'
import * as movieServices from '../services/movieServices.js'


// ###########################################
//Admin side

export const createMovie = asyncHandler(async(req, res) => {
    const body = req.body

    const data = await movieServices.createMovie(body, res)

    res.status(201).json(data)
})


export const updateMovie = asyncHandler(async(req, res) => {
    const body = req.body
    const {id} = req.params

    const data = await movieServices.updateMovie(body, id, res)

    res.status(200).json(data)
})

export const deleteMovie = asyncHandler(async(req, res) => {
    const {id} = req.params

    await movieServices.deleteMovie(id)

    res.status(200).json('successfully deleted')
})

export const deleteComment = asyncHandler(async(req ,res) => {
    const body = req.body

    await movieServices.deleteComment(body, res)
})


// ############################################################
//public side

export const getAllMovies = asyncHandler(async(req, res) => {

    const data = await movieServices.getAllMovies()

    res.status(200).json(data)
})

export const getSpecificMovie = asyncHandler(async(req,res) => {
    const {id} = req.params

    const data = await movieServices.getSpecificMovie(id)

    res.status(200).json(data)
})

export const getNewMovies = asyncHandler(async(req, res) => {
    const data = await movieServices.getNewMovies()

    res.status(200).json(data)
})

export const getTopMovies = asyncHandler(async(req, res) => {
    const data = await movieServices.getTopMovies()

    res.status(200).json(data)
})

export const getRandomMovies = asyncHandler(async(req, res) => {
    const data = await movieServices.getRandomMovies()

    res.status(200).json(data)
})

// #################################################################
// authenticated user

export const movieReview = asyncHandler(async(req, res) => {
    const body = req.body
    const{id}  = req.params

    await movieServices.movieReview(body, id, res, req)
})

