const express=require('express');
const router=express.Router();
const authMiddleware=require('../middleware/authMiddleware');
const {getCart,addToCart, removeFromCart, updateCartItemQuantity}=require('../controllers/cartController')
router.post('/add',authMiddleware,addToCart);
router.get('/',authMiddleware,getCart);
router.delete('/remove/:productId',authMiddleware,removeFromCart);
router.put('/update/:productId',authMiddleware,updateCartItemQuantity);
module.exports=router;