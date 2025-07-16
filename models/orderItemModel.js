const sequelize=require('../config/db');
const {DataTypes}=require('sequelize');
const Order=require('./orderModel');
const Product=require('./productModel');
const OrderItem=sequelize.define('order_item',{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    order_id:{
        type:DataTypes.INTEGER,
        allowNull:false,
        references:{
            model:'order',
            key:"id"
        }
        
    },
    product_id:{
        type:DataTypes.INTEGER,
        allowNull:false,
        references:{
            model:'product',
            key:'id'
        }
    },
    quantity:{
        type:DataTypes.INTEGER,
        defaultValue:1
    },
    price:{
        type:DataTypes.DECIMAL(10,2),
        allowNull:false
    }

},{
    timestamps:true,
    freezeTableName:true
})
Order.hasMany(OrderItem,{foreignKey:'order_id'});
OrderItem.belongsTo(Order,{foreignKey:'order_id'});

Product.hasMany(OrderItem,{foreignKey:'product_id'});
OrderItem.belongsTo(Product,{foreignKey:'product_id'});

module.exports=OrderItem;