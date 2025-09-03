const sequelize=require('../config/db');
const {DataTypes}=require('sequelize');
const User=require('./userModel')
const Cart=sequelize.define('cart',{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    cartAmount:{
        type:DataTypes.DECIMAL(10,2),
        defaultValue:0.0

    }

},{ timestamps:true,
    freezeTableName: true
})
User.hasOne(Cart, { foreignKey: 'user_id' });
Cart.belongsTo(User, { foreignKey: 'user_id' });
module.exports=Cart;
