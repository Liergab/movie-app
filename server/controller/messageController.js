import asyncHandler from 'express-async-handler'
import * as messageController from '../services/messageServices.js'


export const createConversation = asyncHandler(async(req,res) => {

    const{senderId, recieverId} = req.body

    await messageController.createConversation(
            senderId, 
            recieverId, 
            res
    )

})

export const getUserMessageById = asyncHandler(async(req,res) => {
    const {id} = req.params
    await messageController.getUserMessageById(id, res)
})

export const CreateMessage = asyncHandler(async(req, res) => {
    const {conversationId, sender, content} = req.body

    await messageController.createMessage(
        conversationId, 
        sender, 
        content,
        res
    )
})

export const getConversationById = asyncHandler(async(req, res) => {
    const{id} = req.params

    await messageController.getConversationById(id, res)
})

export const findTwoConvo = asyncHandler(async(req, res) => {
    const {firstUserId, secondUserId} = req.params
    await messageController.findTwoConvo(firstUserId,secondUserId, res)

})