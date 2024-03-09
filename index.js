const express= require('express');
const app=express();
const mongoose=require("mongoose");
const dotenv=require('dotenv');
const userRouter=require('./Routes/User');
const postRouter=require('./Routes/Post');
const Port=process.env.Port;
dotenv.config();
mongoose.connect(process.env.MONGODB).then(()=>console.log("Connected to DB"))
.catch(err=>console.log(err));
app.use(express.json());
app.use("/user",userRouter);
app.use("/post",postRouter);
app.listen(5000,()=>{
    console.log("Server is running");
})