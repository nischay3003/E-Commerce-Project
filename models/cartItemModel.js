const sequelize=require('../config/db.js');
const {DataTypes}=require('sequelize');
const Cart=require('./cartModel.js');
const Product=require('./productModel.js');
const CartItem=sequelize.define('cart_item',{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    quantity:{
        type:DataTypes.INTEGER,
        defaultValue:1,
        allowNull:false

    }
},{timestamps:true,
    freezeTableName: true

})

CartItem.belongsTo(Cart, { foreignKey: 'cart_id' });
Cart.hasMany(CartItem, { foreignKey: 'cart_id' });

CartItem.belongsTo(Product, { foreignKey: 'product_id' });
Product.hasMany(CartItem, { foreignKey: 'product_id' });

module.exports = CartItem;