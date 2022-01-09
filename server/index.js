const express=require("express");
const mongoose=require("mongoose");
const dotenv=require("dotenv");
const helmet=require("helmet");
const cors=require("cors");
const userRoute=require("./routes/users.js");
const authRoute=require("./routes/auth.js");
const postRoute=require("./routes/posts.js")

const app=express();

dotenv.config();

mongoose.connect(process.env.MONGO_URL,{useNewUrlParser:true,useUnifiedTopology:true},()=>{
    console.log("Connected to database")
})

//middleware
app.use(express.json());
app.use(helmet());
app.use(cors());

app.use("/server/auth",authRoute);
app.use("/server/user",userRoute);
app.use("/server/post",postRoute);

app.listen(5000,()=>{
    console.log("Server running on PORT 5000")
})