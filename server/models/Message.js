const mongoose=require("mongoose")

const MessageSchema=new mongoose.Schema({
    conversationId:{
        type:String
    },
    sender:{
        type:String
    },
    text:{
        typr:String
    }
},{timestamps:true});

module.exports=mongoose.model("Messages",MessageSchema);