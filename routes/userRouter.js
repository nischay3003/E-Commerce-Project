const express=require('express');
const router=express.Router();
const {registerUser,loginUser, getUserProfile}=require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');
router.post('/register',registerUser);
router.get('/login',loginUser)
router.get('/me',authMiddleware,getUserProfile);
module.exports=router;