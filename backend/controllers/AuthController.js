const bcrypt=require('bcrypt');
const UserModel = require("../models/User");
const jwt=require('jsonwebtoken');


const signup=async(req,res)=>{
    try {
        const {name,email,password}=req.body;
        const user=await UserModel.findOne({email});
        if(user){
            return res.status(400).json({
                message:"user is already exist"
            })
        }
        const userModel=new UserModel({name, email, password})
           userModel.password=await bcrypt.hash(password,10);

           await userModel.save();
           res.status(200).json({
            success:true,
            message:'signup success',
           })
    } catch (error) {
        res.status(401).json({
            success:false,
            message:'internal server error',
        })
    }
}

const login=async(req,res)=>{
    try {
        const {email,password}=req.body;
        const user=await UserModel.findOne({email});
        const errorMsg='Auth Failed email or password is wrong'
        if(!user){
            return res.status(400).json({
                success:false,
                message:errorMsg
            })
        }
        const isPassword=await bcrypt.compare(password,user.password);
        if(!isPassword){
            return res.status(400).json({
                success:false,
                message:errorMsg
            })
        }
        const jwtToken=jwt.sign({email:user.email, _id:user._id}, process.env.JWT_SECRET,{expiresIn:'24h'})
        
           res.status(200).json({
            success:true,
            message:'signup success',
            jwtToken,
            email,
            name:user.name,
           })
    } catch (error) {
        res.status(401).json({
            success:false,
            message:'internal server error',
        })
    }
}

module.exports=
{signup,login

};
