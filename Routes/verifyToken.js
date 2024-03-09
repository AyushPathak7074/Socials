const jwt=require("jsonwebtoken");
const JWTSECRET="dsfi434$#dfsf";

const verifyToken=async(req,res,next)=>{
    const authHeader=req.headers.token;
    if(authHeader){
        const token=authHeader;
        jwt.verify(token,JWTSECRET,(err,user)=>{
            if(err)return res.status(400).json("Some error occured");
            req.user=user;
            next();
        })
    }else{
            return res.status(400).json("invalid access token")
        }
   
}
module.exports= {verifyToken};