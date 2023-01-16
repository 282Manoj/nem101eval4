const jwt =require("jsonwebtoken");

const authenticate=(req,res,next)=>{
    // console.log(req.headers);
    const token=req.headers.authorization;
    console.log(token);
    if(token){
        const decode=jwt.verify(token,"masai");
        if(decode){
            const userID=decode.userID;
            req.body.userID=userID;
            next();
        }
        else{
            res.send("Please login first");
        }
    }
    else{
        res.send("Please Login first");
    }
}
module.exports={
    authenticate
}