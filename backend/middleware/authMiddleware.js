const jwt= require('jsonwebtoken');

function authMiddleware(req,res,next){
    let token=null;
    if(req.cookies && req.cookies.token){
        token=req.cookies.token;
    }
   else if (req.headers.authorization) {
    const parts = req.headers.authorization.split(" ");
    if (parts.length === 2 && parts[0] === "Bearer") {
      token = parts[1];
    }
  }
    console.log("token",token);
    if(!token){
        return res.status(401).json({message:"No token provided"});
    }
    

    try{
        const decoded=jwt.verify(token,process.env.JWT_SECRET);
        req.user=decoded;
        next();
    }
    catch(err){
        return res.status(401).json({message:"Token is invalid or expired."})   
    }

}
module.exports=authMiddleware;