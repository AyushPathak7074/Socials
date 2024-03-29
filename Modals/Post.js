const mongoose=require('mongoose');
const PostSchema= new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    },
    textContent:{
        type:String,
        required:true
    },
    
    image:{
        type:String,
        required:true
    }
    
});

module.exports= mongoose.model("Post",PostSchema);