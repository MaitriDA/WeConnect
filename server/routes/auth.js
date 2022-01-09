const router=require("express").Router();
const User=require("../models/User.js");
const bcrypt=require("bcrypt");

//Register
router.post("/register",async (req,res)=>{
    console.log(req.body);
    try{
        var userFind=await User.findOne({username:req.body.username});
        if(userFind){
            console.log("Username exists")
            res.status(200).json("User name exist")
        }
        userFind=await User.findOne({email:req.body.email});
        if(userFind){
            console.log("email exists")
            res.status(200).json("User already exist");
        }
        //Hash password
        const salt=await bcrypt.genSalt(10);
        const hashedPassword=await bcrypt.hash(req.body.password,salt);  
        //Create new user
        const newUser=await new User({
            username:req.body.username,
            email:req.body.email,
            password:hashedPassword
        });
        //Save user
        const user=await newUser.save();
        res.status(200).json({message:"User Registered"});
    }catch(err){
        console.log(err)
    }
});

//Login
router.post("/login",async (req,res)=>{
    try{
        //Find user
        const user=await User.findOne({email:req.body.email});
        if(!user){
            res.status(404).json({message:"User not found"});
        }
        else{
            //Check password
            const validPassword=await bcrypt.compare(req.body.password,user.password);
            if(!validPassword){
                res.status(400).json({message:"Invalid Credentials"})
            }
            else{
                console.log("Login successful")
                res.status(200).json(user)
            }
        }
    }catch(err){
        console.log(err);
    } 
})

module.exports=router