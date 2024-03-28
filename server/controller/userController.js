import asyncHandler from 'express-async-handler'
import * as userServices from '../services/userServices.js'


export const createUser = asyncHandler(async (req, res) => {

    const { username, email, password } = req.body;

    const user = await userServices.createUser(username, email, password, res);

    res.status(201).json(user);
 
})

export const loginUser = asyncHandler(async(req ,res) => {

    const{email, password} = req.body

     await userServices.loginUser(email, password, res)

})

export const logoutUser = asyncHandler(async(req, res) => {

    await userServices.logoutUser(res)

})


export const getAllUser = asyncHandler(async(req, res) => {
    
        const user = await userServices.getAllUsers()

        res.status(200).json({Data:user})
   
})

export const getCurrentUser = asyncHandler(async(req,res) => {
    res.json(req.user)
})

export const updateCurrentUserProfile = asyncHandler(async(req,res) => {
    
    const{username, email, password} = req.body

    const id = req.user.id

    await userServices.updateCurrentUser(username,email,password,id,res)

})