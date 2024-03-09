const router=require("express").Router();
const User=require("../Modals/User");
const {body,validationResult}=require("express-validator");
const bcrypt=require('bcryptjs');
const jwt=require("jsonwebtoken");
const { verifyToken } = require("./verifyToken");
const JWTSECRET="dsfi434$#dfsf";
//View all Users
router.get('/getUsers',async(req,res)=>{
    let users;
    try {
        users=await User.find();
        if(!users){
            return res.status(401).json("NO User Found");
        }
        return res.status(200).json(users);
    } catch (error) {
        return res.status(500).json("Internal error occured");
    }
})

//Create New User
router.post('/create/user',
body('email').isEmail(),
body('password').isLength({min:6}),
body('username').isLength({min:5}),
async(req,res)=>{
    const error= validationResult(req);
    if(!error.isEmpty()){
        return res.status(400).json("some error occured");
    }
    try {
    let user=await User.findOne({email:req.body.email});
    if(user){return res.status(200).json("User already exist");};

    const salt=await bcrypt.genSalt(10);
    const secretpass= await bcrypt.hash(req.body.password,salt)

    user= await User.create({
        username:req.body.username,
        email:req.body.email,
        password:secretpass
    })

    const accessToken=jwt.sign({
        id:user._id,
        username:user.username
    },JWTSECRET);
    await user.save();
    res.status(200).json({user, accessToken});
}
catch (error) {
        return res.status(500).send(error);
}})

//LOGIN
router.post('/login',
body('email').isEmail(),
body('password').isLength({min:6}),
async(req,res)=>{
    const error= validationResult(req);
    if(!error.isEmpty()){
        return res.status(400).json("some error occured");
    }
    try {
    const user=await User.findOne({email:req.body.email});
    if(!user){
        res.status(400).json("No User found");
    }
    const Comparepassword=await bcrypt.compare(req.body.password,user.password);
    if(!Comparepassword){
        return res.status(400).json("Password is incorrect");
    }
    const accessToken=jwt.sign({
        id:user._id,
        username:user.username
    },JWTSECRET,{expiresIn:3000});
    const {password,...others}=user._doc;
    res.status(200).json({others,accessToken});
} catch (error) {
    res.status(500).json("Internal error occured");
        }})

//Following
router.put('/follow/:id',verifyToken, async(req,res)=>{
    if(req.params.id!== req.body.user)
    {
        const user= await User.findById(req.params.id);
        const otheruser= await User.findById(req.body.user);
        if(!user.Followers.includes(req.body.user))
      {  await user.updateOne({$push:{Followers:req.body.user}});
        await otheruser.updateOne({$push:{Following:req.params.id}});
        return res.status(200).json("User has followed");
      }
     else{
        return res.status(400).json("You already follow this user");
         }
    }
    else{
        return res.status(400).json('You cannot follow yourself');
    }
})

//Update user profile
router.put('/update/:id',verifyToken,async(req,res)=>{
    try {
        if(req.params.id===req.user.id){
        if(req.body.password)
        {
            const salt = await bcrypt.genSalt(10);
            const secretpass= await bcrypt.hash(req.body.password,salt);
            req.body.password=secretpass;
            const updateuser= await User.findByIdAndUpdate(req.params.id,{
                $set:req.body
            })
            await updateuser.save();
            res.status(200).json(updateuser);
        }}
        else{
            return res.status(500).json("You can't update this profile");
        }
    } catch (error) {
        return res.status(500).json('Server Error');
    }
})
//Delete User
router.delete('/delete/:id',verifyToken,async(req,res)=>{
    try {
        if(req.params.id !== req.user.id){
            return res.status(400).json("Account does'nt match")
        }
        else{ 
            await User.findByIdAndDelete(req.params.id);
            return res.status(200).json("Account Deleted Successfully");
        }
    } catch (error) {
        return res.status(500).json("Internal error occured");
    }
})
module.exports=router;