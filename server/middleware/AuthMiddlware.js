import asyncHandler from 'express-async-handler'
import jwt from 'jsonwebtoken'
import userModel from '../model/user.Model.js';


export const AuthMiddleware = asyncHandler(async(req, res, next) => {
    let token;

    token = req.cookies.jwt;

    if(token){
        try {
            const decode = jwt.verify(token, process.env.JWT_SECRET_KEY);
            req.user = await userModel.findById(decode.userId).select('-password')
            next()
        } catch (error) {
            res.status(401)
            throw new Error('Not Authorized,Invalid Token')
        }
    }else{
        res.status(401)
        throw new Error('Not Authorized, No token')
    }
})

export const AdminMiddleware = asyncHandler(async(req ,res ,next) => {
    if(req.user?.isAdmin === true ){
        next()
    }else{
        res.status(401)
        throw new Error('Not Authorized, Not Admin');
    }
})