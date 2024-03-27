import { hashPassword } from "../config/bcrypt.js";
import userModel from "../model/user.Model.js";


export const createUser  = async(username, email, password, res) => {

    if (!username || !email || !password) {
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

export const getAllUsers = async() => {

    const users = await userModel.find();
    return users;
   
}