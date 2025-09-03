const sequelize = require('../config/db');       
const { DataTypes } = require('sequelize');     
const User=require('./userModel')
const Order=sequelize.define('order',{
    id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true
    },
    user_id:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    total_price:{
        type:DataTypes.DECIMAL(10,2),
        allowNull:false
    },
    payment_status:{
        type:DataTypes.STRING,
        defaultValue:'pending'
        
    },
    order_status:{
        type:DataTypes.STRING,
        defaultValue:'processing'

    }





},{
    timestamps:true,
    freezeTableName:true
});
User.hasMany(Order,{foreignKey:'user_id'});
Order.belongsTo(User,{foreignKey:'user_id'});

module.exports=Order;