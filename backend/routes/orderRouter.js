const express=require('express');
const authMiddleware = require('../middleware/authMiddleware');
const { getUserOrders, checkout, cancelOrder, getOrderDetails, recentOrders } = require('../controllers/orderController');
const router=express.Router();

router.get("/",authMiddleware,getUserOrders);
router.get("/recent",authMiddleware,recentOrders);
router.get("/:id",authMiddleware,getOrderDetails);
router.post("/checkout",authMiddleware,checkout);
router.put("/:orderId/cancel",authMiddleware,cancelOrder);

module.exports=router;