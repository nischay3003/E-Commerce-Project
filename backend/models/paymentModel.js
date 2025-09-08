
const sequelize=require('../config/db');
const {DataTypes}=require('sequelize');
const Order = require('./orderModel');

const Payment=sequelize.define('payment',{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    order_id:{
        type:DataTypes.INTEGER,
        allowNull:false,
        references:{
            model:Order,
            key:'id'
        }
    },
    amount:{
        type:DataTypes.DOUBLE(10,2),
        allowNull:false
    },
    method:{
        type:DataTypes.STRING,
        allowNull:false
    },
    status:{
        type:DataTypes.STRING,
        allowNull:false
    },
    transactionId:{
        type:DataTypes.STRING,
        allowNull:false,
        unique:true

    }

},{
    freezeTableName:true,
    timestamps:true
})
Payment.belongsTo(Order,{foreignKey:'order_id'});
Order.hasOne(Payment,{foreignKey:'order_id'});

module.exports=Payment;