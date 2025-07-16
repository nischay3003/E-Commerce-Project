const express=require('express');
const authMiddleware = require('../middleware/authMiddleware');
const makePayment = require('../controllers/paymentController');
const router=express.Router();


router.post('/',authMiddleware,makePayment);
module.exports=router;