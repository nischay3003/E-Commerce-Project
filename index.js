const express= require('express');
const sequelize = require('./config/db');

const userRoutes=require('./routes/userRouter');
const productRoutes=require('./routes/productRouter');
const cartRoutes=require('./routes/cartRouter');
const app=express();
app.use(express.json());
app.use("/api/users",userRoutes);
app.use("/api/products",productRoutes);
app.use("/api/cart",cartRoutes);

require('./models/userModel'); 
require('./models/productModel');
require('./models/cartItemModel');
require('./models/cartModel');
sequelize.sync({alter:true})
  .then(() => {
    app.listen(3000, () => {
      console.log('✅ Server is running on port 3000');
    });
  })
  .catch((err) => {
    console.error('❌ Failed to sync DB:', err);
  });
