const express=require('express');
const ensureAuthonticated = require('../middlewares/Auth');
const router=express.Router();


router.get('/',ensureAuthonticated,(req,res)=>{
    console.log('..lgedin user details',req.user)
    res.status(200).json([
        {
        name:"mobile",
         price:"10000",
        },
        {
            name:"tv",
            price:"2000"
        }
    ])
})


module.exports=router;