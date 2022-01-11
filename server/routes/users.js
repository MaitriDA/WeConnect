const router=require("express").Router();
const User=require('../models/User.js');

//Update User
router.put("/:id",async(req,res)=>{
    if(req.body.userId === req.params.id || req.user.isAdmin){
        try{
            const user=await User.findByIdAndUpdate(req.params.id,{
                $set:req.body
            });
            res.status(200).json("Acount Updated")
        }catch(err){
            res.status(400).json("Error")
        }
    }
    else{
        return res.status(403).json({message:"You can update only your account"})
    }
})

//get a user
router.get("/:id",async(req,res)=>{
    try{
        const user=await User.findById(req.params.id)
        res.status(200).json(user)
    }catch(err){
        res.status(00).json({message:"Error"})
    }
})

//follow user
router.put("/:id/follow",async(req,res)=>{
    if(req.body.userId!==req.params.id){
        try{
            const user=await User.findById(req.params.id);
            const currentUser=await User.findById(req.body.userId);
            if(!user.followers.includes(req.body.userId)){
                await user.updateOne({$push:{followers:req.body.userId}});
                await currentUser.updateOne({$push:{followings:req.params.id}});
                res.status(200).json({message:"User Followed"})
            }
            else{
                res.status(403).json({message:"Already Following"})
            }
        }catch(err){
            res.status(500).json("Error")
        }
    }
    else{
        res.status(403).json({message:"You can't follow yourself"})
    }
})

//unfollow user
router.put("/:id/unfollow",async(req,res)=>{
    if(req.body.userId!==req.params.id){
        try{
            const user=await User.findById(req.params.id);
            const currentUser=await User.findById(req.body.userId);
            if(user.followers.includes(req.body.userId)){
                await user.updateOne({$pull:{followers:req.body.userId}});
                await currentUser.updateOne({$pull:{followings:req.params.id}});
                res.status(200).json({message:"User Unfollowed"})
            }
            else{
                res.status(403).json({message:"You don't follow tis user"})
            }
        }catch(err){
            res.status(500).json("Error")
        }
    }
    else{
        res.status(403).json({message:"You can't follow yourself"})
    }
})

//Get Friends List
router.get("/:id/friends",async(req,res)=>{
    try{
        const user=await User.findById(req.params.id);
        const friends=await Promise.all(
            user.followings.map((f)=>{
                return User.findById(f);
            })
        )
        const friendsDetails=[];
        friends.map(f=>{
            console.log(f);
            friendsDetails.push({_id:f._id,username:f.username,profilePicture:f.profilePicture})
        })
        res.status(200).json(friendsDetails);
    }catch(err){
        res.status(400).json("Error");
    }
})

//Get Suggestions
router.get("/:id/suggestion",async(req,res)=>{
    try{
        const user=await User.findById(req.params.id);
        const users=await User.find();
        const suggestionDetails=[];
        {users.map(u=>{
            if(JSON.stringify(user)!==JSON.stringify(u)){
                console.log(u);
                if(!user.followings.includes(u._id)){
                    suggestionDetails.push({_id:u._id,username:u.username,profilePicture:u.profilePicture});
                }
            }
        })}
        res.status(200).json(suggestionDetails);
    }catch(err){
        res.status(400).json("Error");
    }
})
module.exports=router