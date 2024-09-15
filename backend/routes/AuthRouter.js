const express=require('express');
const { signupValidation, loginValidation } = require('../middlewares/AuthValidation');
const { signup, login } = require('../controllers/AuthController');
const router=express.Router();


router.post('/login',loginValidation,login)
router.post('/signup',signupValidation,signup)

module.exports=router;