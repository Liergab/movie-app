import express          from 'express'
import * as controller  from '../controller/userController.js'
import {AdminMiddleware, AuthMiddleware} from '../middleware/AuthMiddlware.js'

const userRouter = express.Router()

userRouter.post('/',       controller.createUser)
userRouter.post('/logout', controller.logoutUser)
userRouter.post('/login',  controller.loginUser)
userRouter.get('/', controller.getAllUser)
userRouter.get('/profile', [AuthMiddleware], controller.getCurrentUser)
userRouter.put('/', [AuthMiddleware], controller.updateCurrentUserProfile)
userRouter.get('/:id', controller.getUserById)



export default userRouter