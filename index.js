const express= require('express');
const sequelize = require('./config/db');

const userRoutes=require('./routes/userRouter');
const productRoutes=require('./routes/productRouter');
const cartRoutes=require('./routes/cartRouter');
const addressRouter=require('./routes/addressRouter');
const orderRoutes=require('./routes/orderRouter');
const paymentRoutes=require('./routes/paymentRouter');
const app=express();
app.use(express.json());
app.use("/api/users",userRoutes);
app.use("/api/products",productRoutes);
app.use("/api/cart",cartRoutes);
app.use("/api/orders",orderRoutes);
app.use("/api/payments",paymentRoutes);
app.use("/api/addresses",addressRouter)

require('./models/paymentModel');
require('./models/userModel'); 
require('./models/productModel');
require('./models/cartItemModel');
require('./models/cartModel');
require('./models/categoryModel')
require('./models/orderModel')
require('./models/orderItemModel');
require('./models/addressModel');
sequelize.sync({alter:true})
  .then(() => {
    app.listen(3000, () => {
      console.log('✅ Server is running on port 3000');
    });
  })
  .catch((err) => {
    console.error('❌ Failed to sync DB:', err);
  });
