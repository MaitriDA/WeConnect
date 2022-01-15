const mongoose=require("mongoose")

const PostSchema=new mongoose.Schema({
    userId:{
        type:String,
        required:true
    },
    description:{
        type:String,
    },
    tags:{
        type:String,
    },
    location:{
        type:String,
    },
    image:{
        type:String
    },
    likes:{
        type:Array,
        default:[]
    },
    heart:{
        type:Array,
        default:[]
    },
    comment:{
        type:Array,
        default:[]
    }
},{timestamps:true});

module.exports=mongoose.model("Posts",PostSchema);