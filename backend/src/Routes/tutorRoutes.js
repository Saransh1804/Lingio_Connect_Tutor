import express from "express"
import Tutor from "../models/tutor.js"
import {StreamChat} from "stream-chat"

const router = express.Router()
const apiKey = '9nrade67axhx';
const apiSecret = 'h8hj799ebzsrc5e2qm5d8fbgftfxm6buagjr5k8vgq8kzexqgryeeh7znru9dmv9';

router.post("/", async(req,res)=>{
    const {password} = req.body
    const mobileNumber = password

    const tutor = await Tutor.find({
        mobileNumber : mobileNumber
    })
    if(!tutor)
        return res.status(400).json({message:"Tutor does not exist"})

    // console.log(tutor)

    res.status(201).json(tutor)
})


router.post("/getToken",async(req, res)=>{
    try{
        const {tutorId} = req.body
    if (!tutorId) {
        return res.status(400).send('tutor ID is required');
      }
    
      const serverClient = StreamChat.getInstance(apiKey, apiSecret);
      const token = serverClient.createToken(tutorId);
      console.log(token)
      
      res.send({ token });
    }
    catch(error)
    {
        console.log(error)
        res.status(500).json({message:"Something went wrong"})
    }
    
})
export default router
