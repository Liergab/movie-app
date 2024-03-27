import asyncHandler from 'express-async-handler'
import * as userServices from '../services/userServices.js'


export const createUser = asyncHandler(async (req, res) => {

    const { username, email, password } = req.body;

    const user = await userServices.createUser(username, email, password, res);

    res.status(201).json(user);
 
})


export const getAllUser = asyncHandler(async(req, res) => {
    
        const user = await userServices.getAllUsers()

        res.status(200).json({Data:user})
   
})