import express         from 'express'
import * as controller from '../controller/userController.js'
const userRouter = express.Router()

userRouter.post('/', controller.createUser)
userRouter.get('/', controller.getAllUser)



export default userRouter