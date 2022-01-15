const router=require("express").Router();
const Post=require("../models/Post.js");
const User=require("../models/User.js")

//Create Post
router.post("/",async(req,res)=>{
    try{
        //Create new Post
        const newPost=new Post(req.body);
        const post=await newPost.save();
        res.status(200).json("Post Created")
    }catch(err){
        res.status(500).json("Error")
    }
})

//Update Post
router.put("/:id",async (req,res)=>{
    try{
        const post=await Post.findById(req.params.id);
        if(post.userId===req.body.userId){
            await post.updateOne({$set:req.body});
            res.status(200).json({message:"Post Updated"})
        }
        else{
            res.status(403).json({message:"You can update only your post"})
        }
    }catch(err){
        res.status(500).json({message:"Error"})
    }
})

//Delete Post
router.delete("/:id",async(req,res)=>{
    try{
        const post=await Post.findById(req.params.id);
        if(post.userId===req.body.userId){
            await post.deleteOne();
            res.status(200).json({message:"Post Deleted"})
        }
        else{
            res.status(403).json({message:"You can delete only your post"})
        }
    }catch(err){
        res.status(500).json({message:"Error"})
    }
})

//Like a Post
router.put("/:id/like",async(req,res)=>{
    try{
        const post=await Post.findById(req.params.id);
        if(post.userId!==req.body.userId){
            if(!post.likes.includes(req.body.userId)){
                await post.updateOne({$push:{likes:req.body.userId}});
                res.status(200).json("Post liked");
            }
            else{
                res.status(200).json("Post already liked")
            }
        }
        else{
            res.status(200).json("You can't like your post")
        }
    }catch(err){
        res.status(500).json(err)
    }
})

//Love a post
router.put("/:id/heart",async(req,res)=>{
    try{
        const post=await Post.findById(req.params.id);
        if(post.userId!==req.body.userId){
            if(!post.heart.includes(req.body.userId)){
                await post.updateOne({$push:{heart:req.body.userId}});
                res.status(200).json("Post loved");
            }
            else{
                res.status(200).json("Post already loved")
            }
        }
        else{
            res.status(200).json("You can't love your post")
        }
    }catch(err){
        res.status(500).json(err)
    }
})

//Comment on Post
router.put("/:id/comment",async(req,res)=>{
    try{
        const post=await Post.findById(req.params.id);
        if(post.userId!==req.body.userId){
            await post.updateOne({$push:{comment:req.body}});
            res.status(200).json({message:"Commented on post"});
        }
        else{
            res.status(403).json({message:"You can't comment on your post"})
        }
    }catch(err){
        res.status(500).json(err)
    }
})

//Bookmark a post
router.put("/:id/bookmark",async(req,res)=>{
    try{
        const post=await Post.findById(req.params.id);
        const user=await User.findById(req.body.userId);
        if(post.userId!==req.body.userId){
            if(!user.bookMark.includes(req.params.id)){
                await user.updateOne({$push:{bookMark:req.params.id}});
                res.status(200).json({message:"Post bookmarked"});
            }
            else{
                await user.updateOne({$pull:{bookMark:req.params.id}});
                res.status(200).json({message:"Bookmarked removed"});
            }
        }
        else{
            res.status(403).json({message:"You can't bookmark your post"})
        }
    }catch(err){
        res.status(500).json(err)
    }
})

//Get Bookmarked Post
router.get("/:id/bookmark",async(req,res)=>{
    try{
        const user=await User.findById(req.params.id);
        const posts=await Promise.all(
            user.bookMark.map((b)=>{
                return Post.findById(b);
            })
        )
        res.status(200).json(posts);
        
    }catch(err){
        res.status(500).json(err)
    }
})

//If post is bookmarked or not
router.get("/:id1/bookmarkcheck/:id2",async(req,res)=>{
    try{
        const user=await User.findById(req.params.id1);
        if(user.bookMark.includes(req.params.id2)){
            res.status(200).json(true);
        }
        else{
            res.status(200).json(false);
        }
        
    }catch(err){
        res.status(500).json("Error");
    }
})
//Get Posts of user
router.get("/:id/user",async(req,res)=>{
    try{
        const post=await Post.find({userId:req.params.id})
        res.status(200).json(post)
    }catch(err){
        res.status(500).json({message:"Error"})
    }
})

//Get Posts of followings
router.get("/:id/followings",async(req,res)=>{
    try{
        const user=await User.findById(req.params.id)
        const followingPosts=await Promise.all(
            user.followings.map((followingId)=>{
                return Post.find({ userId: followingId });
            })
        )
        const posts=[];
        //Destructuring the array
        followingPosts.map((p)=>{
            p.map((post)=>{
                posts.push(post);
            })
        })
        res.status(200).json(posts)
    }catch(err){
        res.status(500).json({message:"Error"})
    }
})
module.exports=router