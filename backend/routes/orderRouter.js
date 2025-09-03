const express=require('express');
const authMiddleware = require('../middleware/authMiddleware');
const { getUserOrders, checkout, cancelOrder, getOrderDetails } = require('../controllers/orderController');
const router=express.Router();

router.get("/",authMiddleware,getUserOrders);
router.get("/:id",authMiddleware,getOrderDetails);
router.post("/checkout",authMiddleware,checkout);
router.put("/:id/cancel",authMiddleware,cancelOrder);
module.exports=router;