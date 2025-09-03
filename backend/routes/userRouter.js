const express=require('express');
const router=express.Router();
const {registerUser,loginUser, getUserProfile,logoutUser}=require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');
router.post('/register',registerUser);
router.post('/login',loginUser)
router.get('/me',authMiddleware,getUserProfile);
router.post('/logout',authMiddleware,logoutUser);
module.exports=router;