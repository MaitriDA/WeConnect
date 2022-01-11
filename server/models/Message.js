const mongoose=require("mongoose")

const MessageSchema=new mongoose.Schema({
    msg:{
        type:String
    },
    conversationId:{
        type:String
    },
    sender:{
        type:String
    }
},{timestamps:true});

module.exports=mongoose.model("Messages",MessageSchema);