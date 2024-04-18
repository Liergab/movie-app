import Conversation from '../model/CONVERSATION_MODEL.js'
import Message from '../model/MESSAGE_MODEL.js'

export const createConversation = async(senderId, recieverId, res) => {

    const conversation = await Conversation.create({
      members:[senderId, recieverId]
    })

    res.status(201).json(conversation)

}

export const getUserMessageById = async(id, res) => {
    const conversation = await Conversation.find({
        members:{$in:[id]}
    })

    res.status(200).json(conversation)
}

export const createMessage = async(conversationId, sender, content, res) => {
    const newMessage = await Message.create({
        conversationId,
        sender,
        content
    })

    res.status(201).json(newMessage)

}

export const getConversationById = async(id, res) => {
    const messages = await Message.find({
        conversationId:id
    })

    res.status(200).json(messages)
}

