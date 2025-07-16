const sequelize=require('../config/db');
const Order=require('../models/orderModel')
const Payment=require('../models/paymentModel');
async function makePayment(req,res){
    try{
    const {order_id,amount,method,status}=req.body;
    const order=await Order.findOne({where:{id:order_id,user_id:req.user.id}});
    if(!order){
        return res.status(400).json({message:"Order Not Found"});

    }
    //check if the payment hasn't already been made
    if(order.payment_status==="paid"){
        return res.status(400).json({message:"Payment has already been made for the order"});
    }
    const payment=await Payment.create(
        { 
            order_id,
            amount,
            method,
            status:status || 'success'
            

        }
    )
    order.payment_status='paid';
    await order.save();
    return res.status(200).json({message:"Payment Successful",payment_id:payment.id});
    }catch(err){
        console.log(err);
        return res.status(500).json({message:"Failed to complete the payment"})
    }
    

}
module.exports=makePayment;