import express from "express"
import Conversation from "../models/conversation.js"
import Message from "../models/message.js"

const router  = express.Router()



router.post("/sendMessage", async(req,res)=>{
    try{

        const {id, userId , message} = req.body
        const senderId = id
        const receiverId = userId

        let conversation = await Conversation.findOne({
            participants:{$all:[senderId, receiverId]},
        })

        if(!conversation)
            {
                conversation = await Conversation.create({
                    participants:[senderId, receiverId]
                })
            }

            const newMessage = new Message({
                senderId,
                receiverId,
                message
            })
            if(newMessage)
                {
                    conversation.messages.push(newMessage._id)
                }

        await Promise.all([conversation.save(), newMessage.save()])

        res.status(201).json(newMessage)

    }
    catch(error){
        console.log(error)
        res.status(500).json({message:"Something went wrong"})
    }
})

router.post("/getMessages", async(req,res)=>{
    try{
        const {tutorId, userId} = req.body
        const conversation = await Conversation.findOne({
            participants :{$all:[userId, tutorId]}
        }).populate("messages")

        if(!conversation)
            {
                return res.status(200).json([])
            }

            const messages = conversation.messages
            res.status(201).json(messages)
    }
    catch(error){
        console.log(error)
        res.status(500).json({message:"Something went wrong"})

    }
})


export default router