import express from 'express'
import * as controller from '../controller/messageController.js'
const messageRouter = express.Router()

messageRouter.post('/', controller.createConversation)
messageRouter.get('/:id', controller.getUserMessageById)
messageRouter.post('/create-message', controller.CreateMessage)
messageRouter.get('/conversation/:id',controller.getConversationById)

export default messageRouter
