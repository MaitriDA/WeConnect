const router=require("express").Router();
const Conversation=require('../models/Conversation.js')

//new Conversation
router.post("/",async(req,res)=>{
    const newConversation=new Conversation({
        member:[req.body.senderId,req.body.receiverId]
    });
    try{
        const savedConversation=await newConversation.save();
        res.status(200).json(savedConversation);
    }catch(err){
        res.status(500).json("Error");
    }
})

//get conversation of a user
router.get("/:userId",async(req,res)=>{
    try{
        const conversation=await Conversation.find({
            member:{$in:[req.params.userId]}
        });
        res.status(200).json(conversation);
    }catch(err){
        res.status(500).json("Error");
    }
})

module.exports=router;