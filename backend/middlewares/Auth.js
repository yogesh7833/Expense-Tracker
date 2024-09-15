const jwt=require('jsonwebtoken')

const ensureAuthonticated=(req,res,next)=>{
    const auth=req.headers['authorization'];
    if(!auth){
        return res.status(400).json({
            message:"unothorized, jwt token is required"
        })
    }
    try {
        const decoded= jwt.verify(auth,process.env.JWT_SECRET);
        req.user=decoded;
        next();
    } catch (error) {
        return res.status(400).json({
            message:"unothorized, jwt token wrong or expired"
        })
    }

}

module.exports=ensureAuthonticated;