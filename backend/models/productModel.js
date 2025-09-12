const sequelize = require('../config/db');       
const { DataTypes } = require('sequelize');      
const   Category=require('./categoryModel');
const Review = require('./reviewsModel');
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
    get() {
    const rawValue = this.getDataValue('price');
    return rawValue === null ? null : parseFloat(rawValue);
    },
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
// Product.belongsTo(Category, { foreignKey: 'category_id' });
// Category.hasMany(Product, { foreignKey: 'category_id' });
// // Product.hasMany(Review,{foreignKey:'productId', as:'review'});

module.exports=Product;