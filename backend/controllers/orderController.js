const Cart = require('../models/cartModel');
const Order = require('../models/orderModel');
const OrderItem = require('../models/orderItemModel');
const CartItem = require('../models/cartItemModel');
const Product = require('../models/productModel');

async function checkout(req, res) {
    try {
        const userId = req.user.id;
        const cart = await Cart.findOne({ where: { user_id: userId } });
        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }
        const cartItems = await CartItem.findAll({ where: { cart_id: cart.id }, include: [Product] });

        if (cartItems.length === 0) {
            return res.status(400).json({ message: "Cart is empty" });
        }
        let totalVal = 0;
        for (const item of cartItems) {
            const quantity = item.quantity;
            const price = item.product.price;
            totalVal += quantity * price;
        }
        const finalVal=totalVal+totalVal*0.08;//for taxes


        const order = await Order.create({
            user_id: userId,
            total_price: finalVal,
            payment_status: 'pending',
            order_status: 'processing'
        });
        for (const item of cartItems) {
            await OrderItem.create({
                order_id: order.id,
                price: item.product.price,
                quantity: item.quantity,
                product_id: item.product_id
            });
        }
        // clear cart
        await CartItem.destroy({ where: { cart_id: cart.id } });
        await Cart.destroy({ where: { id: cart.id } });
        res.status(201).json({ message: "Order created successfully", order_id: order.id });

    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Failed to place order" });
    }
}

async function getUserOrders(req, res) {
    try {
        const userId = req.user.id;
        const orders = await Order.findAll({ where: { user_id: userId }, include: [{ model: OrderItem, include: [Product] }] });
        if (!orders || orders.length === 0) {
            return res.status(404).json({ message: "No orders found" });
        }
        res.status(200).json({
            "orders": orders
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Failed to fetch orders" });
    }
}

async function getOrderDetails(req, res) {
    try {
        const orderId = req.params.id;
        const order = await Order.findOne({ where: { id: orderId } });
        if (!order) {
            return res.status(404).json({ message: "Order Not Found" });
        }
        if (order.user_id != req.user.id) {
            return res.status(403).json({ message: "Unauthorized access" });
        }
        const orderDetail = await OrderItem.findAll({ where: { order_id: order.id }, include: [Product] });
        if (!orderDetail || orderDetail.length === 0) {
            return res.status(404).json({ message: "Order Details Not Found" });
        }
        res.status(200).json({
            order_id: order.id,
            order_details: orderDetail
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Failed to fetch orders" });
    }
}
async function recentOrders(req,res){
    console.log("Reached recentorders:");
    
    try{
        const userId=req.user.id;
        const limit= parseInt(req.query.limit) || 5;;
        console.log("Limit:",limit);
        const recentorders = await Order.findAll({
            where: { user_id: userId },
            order: [['createdAt', 'DESC']],
            limit,
            include: [{ model: OrderItem }]
        });
        return res.status(200).json({recentOrders:recentorders});
    }catch(err){
         console.error(err);
        res.status(500).json({ message: "Failed to fetch recent orders" });
    }
}

async function cancelOrder(req, res) {
    try {
        const orderId = req.params.orderId;
        const order = await Order.findOne({ where: { id: orderId } });
        if (!order) {
            return res.status(404).json({ message: "Order Not Found" });
        }
        if (order.user_id != req.user.id) {
            return res.status(403).json({ message: "Unauthorized access" });
        }
        if (order.order_status != 'processing') {
            return res.status(409).json({ message: "Order cannot be cancelled" });
        }
        order.order_status = 'cancelled';
        await order.save();
        return res.status(200).json({ message: "Order cancelled successfully" });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Failed to cancel order" });
    }
}

module.exports = { checkout, cancelOrder, getOrderDetails, getUserOrders ,recentOrders};
