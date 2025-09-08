const sequelize = require('../config/db');       
const { DataTypes } = require('sequelize');      
const   Category=require('./categoryModel')
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
    
   },
   longDesc:{
    type:DataTypes.TEXT,
    allowNull:false
   },
   
   specification:{
        type:DataTypes.JSONB,
        allowNull:false
    }
   ,
   category_id:{
    type:DataTypes.INTEGER,
    allowNull:true,
    references:{
        model:'category',
        key:'id'
    }
   }


},{
    timestamps:true,
    freezeTableName: true
})
Product.belongsTo(Category, { foreignKey: 'category_id' });
Category.hasMany(Product, { foreignKey: 'category_id' });


module.exports=Product;