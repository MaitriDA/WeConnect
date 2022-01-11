const router=require("express").Router();
const User=require("../models/User.js");
const bcrypt=require("bcrypt");

//Register
router.post("/register",async (req,res)=>{
    console.log(req.body);
    try{
        var userFind=await User.findOne({username:req.body.username});
        if(userFind){
            res.status(200).json("Username already exist")
        }
        userFind=await User.findOne({email:req.body.email});
        if(userFind){
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
        res.status(200).json("User Registered");
    }catch(err){
        res.status(500).json("Error");
    }
});

//Login
router.post("/login",async (req,res)=>{
    try{
        //Find user
        const user=await User.findOne({email:req.body.email});
        if(!user){
            res.status(200).json("User not found");
        }
        else{
            const validPassword=await bcrypt.compare(req.body.password,user.password);
            if(!validPassword){
                res.status(200).json("Invalid Credentials")
            }
            else{
                res.status(200).json(user)
            }
        }
    }catch(err){
        res.status(500).json("Error")
    } 
})

module.exports=router