import { comparedPassword, hashPassword } from "../config/bcrypt.js";
import userModel from "../model/user.Model.js";
import GenerateToken from "../util/GenerateToken.js";


export const createUser  = async(username, email, password, res) => {

    if (!username || !email || !password) {
        res.status(400)
        throw new Error("All fields required!");
      }
    
    const existingEmail = await userModel.findOne({ email });

    if (existingEmail) {
        res.status(400)
        throw new Error("Email already used!");
    }
    
    const user = await userModel.create({
         username,
         email, 
         password:await hashPassword(password)
    });
    
    return user;
}

export const loginUser = async(email, password, res) => {

    if ( !email || !password) {
        res.status(400)
        throw new Error("All fields required!");
      }
    const user = await userModel.findOne({email})

    if(user && await comparedPassword(password, user.password)){
       GenerateToken(res, user.id)
       return res.status(200).json({  
            id       : user.id,
            email     : user.email,
            username  : user.username,
            createdAt : user.createdAt,
        })
    }else{
        res.status(400)
        throw new Error('Invalid Credentials')
    }

}

export const logoutUser = async(res) => {
    res.cookie('jwt','',{
        httpOnly:true,
        expires: new Date(0)
    })

    res.status(200).json({message:'successfully logout!'})

}

export const getAllUsers = async() => {

    const users = await userModel.find().select('-password');
    return users;
   
}

export const updateCurrentUser = async(username, email, password, id,res) => {

     const updateFields = {
        username,
        email
    };

    if (password) {
        updateFields.password = await hashPassword(password);
    }

    const updateUser = await userModel.findByIdAndUpdate(id, { $set: updateFields }, { new: true });

    return res.status(200).json({
        _id: updateUser.id,
        username: updateUser.username,
        email: updateUser.email,
        createdAt: updateUser.createdAt,
        updatedAt: updateUser.updatedAt
    });
}