const mongoose=require('mongoose');
const UserSchema= new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    bio:{
        type:String,
        
    },
    profiepic:{
        type:String

    },
    Followers:{
        type:Array
    },
    Following:{
        type:Array
    }
})

module.exports= mongoose.model("User",UserSchema);