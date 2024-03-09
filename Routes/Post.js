const router=require("express").Router();
const Post=require("../Modals/Post");
const {verifyToken}=require("./verifyToken");

//Create a post
router.post("/user/post",verifyToken,async(req,res)=>{
   try {
        let {textContent,image}=req.body;
        let newpost=new Post({
            textContent,image,user:req.user.id
        });
        const post= await newpost.save();
        res.status(200).json(post);
       // console.log(newpost);
    } catch (error) {
        return res.status(400).json("Internal error occurerd");
        
    }
});
//ViewPostofUser
router.get('/get/post',verifyToken,async(req,res)=>{
    try {
        const mypost= await Post.find({user:req.user.id}).sort('-createdAt');
        if(!mypost){
            return res.status(401).json("No Post found");
        }
        res.status(200).json(mypost);
    } catch (error) {
        res.status(500).json('Internal Error Occured');
    }
})
//Update user post
router.put('/update/:id',async(req,res)=>{
   try {
        let post=await Post.findById(req.params.id);
        if(!post){
            return res.status(400).json("Post not found");
        }
         post=await Post.findByIdAndUpdate(req.params.id, {
            $set:req.body
         })
         await post.save();
         res.status(200).json(post);
    } catch (error) {
        res.status(500).json('Internal error occured');
    }
})
//Delete Post
router.delete('/delete/:id',verifyToken,async(req,res)=>{
    try {
        const post=await Post.findById(req.params.id);
        if(post.user == req.user.id){
            const deletepost = await Post.findByIdAndDelete(req.params.id);
            return res.status(200).json("Your post deleted");
        }
        else{
            return res.status(400).json("You are not allowed to delete this post");
        }
    } catch (error) {
        res.status(500).json("Internal error occured");
    }
})
module.exports=router;