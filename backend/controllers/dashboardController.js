const  User =require( "../models/userModel");
const Order=require("../models/orderModel");
const Cart =require( "../models/cartModel");
const  Address =require( "../models/addressModel");
const CartItem=require("../models/cartItemModel");
const Product=require("../models/productModel")
async function getDashboard(req,res){
    try{const userId=req.user.id;

    const user=await User.findByPk(userId,{
        attributes:['id','first_name','last_name','email']
    });
    if(!user){
        return res.json("User Not found");
    }

    const orders=await Order.findAll({where:{user_id:userId}},{
        include:["order_item"]
    });

    const cart = await Cart.findAll({
  where: { user_id: userId },
  include: [
    {
      model: CartItem,
      as: "cart_items",
      include: [
        {
          model: Product,
          as: "product",
          attributes: ["id", "name", "price"], // pick only needed fields
        },
      ],
    },
  ],
});

    const addresses=await Address.findAll({where:{user_id:userId}});
    res.status(200).json({user,orders,cart,addresses});
}catch(err){
    console.log(err);
    return res.status(500).json("Failed to fetch dashboard")
}



}
module.exports=getDashboard;
