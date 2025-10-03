require('dotenv').config();
const cors=require('cors');
const express= require('express');
const sequelize = require('./config/db');
const userRoutes=require('./routes/userRouter');
const productRoutes=require('./routes/productRouter');
const cartRoutes=require('./routes/cartRouter');
const addressRoutes=require('./routes/addressRouter');
const orderRoutes=require('./routes/orderRouter');
const paymentRoutes=require('./routes/paymentRouter');
const cookieParser = require('cookie-parser');
const categoryRoutes=require("./routes/categoryRouter")
const productImageRouter=require('./routes/productImageRouter');
const reviewRouter=require('./routes/reviewRouter');
const bannerRouter=require('./routes/bannerRouter');
const dashboardRoutes = require("./routes/dashboardRouter");


const PORT=process.env.PORT || 3000;
const app=express();
app.use(express.json());
app.use(cookieParser())
app.use(cors({
  origin:["http://localhost:3001","*"],
  credentials:true
  }
));
app.use("/api/users",userRoutes);
app.use("/api/products",productRoutes);
app.use("/api/cart",cartRoutes);
app.use("/api/orders",orderRoutes);
app.use("/api/payments",paymentRoutes);
app.use("/api/addresses",addressRoutes)
app.use("/api/category",categoryRoutes);
app.use("/api/productImages",productImageRouter);
app.use("/api/reviews",reviewRouter);
app.use("/api/banners",bannerRouter);
app.use("/api/dashboard", dashboardRoutes);


require('./models/paymentModel');
require('./models/userModel'); 
require('./models/productModel');
require('./models/cartItemModel');
require('./models/cartModel');
require('./models/categoryModel')
require('./models/orderModel')
require('./models/orderItemModel');
require('./models/addressModel');
require('./models/bannersModel');
require('./models/reviewsModel');
require('./models/productImagesModel');


//load association
require('./models/association');

sequelize.sync({alter:true})
  .then(() => {
    app.listen(PORT ,() => {
      console.log('✅ Server is running on port 3000');
    });
  })
  .catch((err) => {
    console.error('❌ Failed to sync DB:', err);
  });
