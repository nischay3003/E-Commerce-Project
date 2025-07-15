const sequelize = require('../config/db');       
const { DataTypes } = require('sequelize');      

const Product=sequelize.define('product',{
   id:{
    type:DataTypes.INTEGER,
    primaryKey:true,
    autoIncrement:true
   },
   name:{
    type:DataTypes.STRING,
    unique:true,
    allowNull:false
   },
   price:{
    type:DataTypes.DECIMAL(10,2),
    allowNull:false
   },
   description:{
    type:DataTypes.STRING,
    allowNull:true,
    
   }


},{
    timestamps:true,
    freezeTableName: true
})

module.exports=Product;