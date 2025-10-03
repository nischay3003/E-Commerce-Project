const Cart = require('../models/cartModel');
const CartItem = require('../models/cartItemModel');
const Product = require('../models/productModel');
const ProductImage=require('../models/productImagesModel')
const  sequelize  = require('../config/db');
async function addToCart(req, res) {
  try {
    const userId = req.user.id;
    const productId=req.body.product_id;
    const quantity=req.body.quantity;
    console.log("Product Id:",productId);


    let cart = await Cart.findOne({ where: { user_id: userId } });

    if (!cart) {
      cart = await Cart.create({ user_id: userId });
    }

 
    let cartItem = await CartItem.findOne({
      where: {
        cart_id: cart.id,
        product_id:productId
      }
    });

    if (cartItem) {
      cartItem.quantity += quantity;
      await cartItem.save(); 
    } else {
      await CartItem.create({
        cart_id: cart.id,
        product_id:productId,
        quantity
      });
    }

    return res.status(200).json({ message: "Item added to cart successfully." });

  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Failed to add to cart" });
  }
}
async function clearCart(req, res) {
 
  const t = await sequelize.transaction(); // start transaction
  try {
    const userId = req.user.id;

    // Find user's cart
    console.log("UserId from clear cart:",userId);
     let cart = await Cart.findOne({ where: { user_id: userId },transaction: t });
    console.log("cartttttt fetcheddd---------",cart)
    if (!cart) {
      await t.rollback();
      return res.status(400).json({ message: "Cart not found" });
    }

    // Delete cart items
    await CartItem.destroy({ where: { cart_id: cart.id }, transaction: t });

    // Delete the cart itself
    await Cart.destroy({ where: { id: cart.id }, transaction: t });

    await t.commit(); // commit transaction
    return res.status(200).json({ message: "Cart cleared successfully" });
  } catch (err) {
    await t.rollback(); // rollback transaction on error
    console.log(err);
    return res.status(500).json({ message: "Unable to clear cart" });
  }
}
async function getCart(req, res) {
  try {
    const userId = req.user.id;

    const cart = await Cart.findOne({ where: { user_id: userId } });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const cartItems = await CartItem.findAll({
      where: { cart_id: cart.id },
        include: [
          {
            model: Product,
            attributes: ['name', 'price', 'description'],
           include: [
            {
              model: ProductImage,
              as: 'images',
              attributes: ['id', 'imageUrl']
            }
          ]
          }
        ]
      });

    return res.status(200).json({
      cart_id: cart.id,
      items: cartItems
    });

  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Failed to fetch Cart" });
  }
}
async function removeFromCart(req,res) {
    
    try
    {

    const productId=req.params.productId;   
    const userId=req.user.id;

    const cart=await Cart.findOne({where:{user_id:userId}});
    if(!cart){
        return res.status(404).json({message:"Cart Not Found"});

    }
    const cartItem=await CartItem.findOne({where:{
        cart_id:cart.id,
        product_id:productId
    }})

    if(!cartItem){
      return res.status(404).json({message:"Item Not Found In The Cart"});
    }

    await cartItem.destroy();
    return res.status(200).json({message:"Item removed from cart"});
    }catch(err){
        console.log(err);
        return res.status(500).json({message:"Failed to remove item from cart"});
    }


    
}
async function updateCartItemQuantity(req,res){
  
  try {
    const productId=req.params.productId;
    const userId=req.user.id;
    const quantity=req.body.quantity;

    const cart=await Cart.findOne({where:{user_id:userId}});

    if(!cart){
      return res.status(404).json({message:"Cart Not Found"})
    }
    
    const cartItem=await CartItem.findOne({where:{
        cart_id:cart.id,
        product_id:productId
    }})

    if(!cartItem){
      res.status(404).json("Item Not Found In The Cart");
    }
    if(cartItem.quantity==1 && quantity==0){
      await cartItem.destroy();
      return res.status(200).json("Item Removed From Cart");
    }
    else{
      cartItem.quantity=quantity;
      await cartItem.save();
      return res.status(200).json("Cart Item Updated")

    }
    
  }catch(err){
    console.log(err);
    return res.status(500).json({message:"Failed to update cart item"});
  }

}

module.exports = { addToCart, getCart ,removeFromCart,updateCartItemQuantity,clearCart};
