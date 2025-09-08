const sequelize=require('../config/db');
const {DataTypes}=require('sequelize');
const User =require("./userModel");
const Product=require ("./productModel");
const Review=sequelize.define('review',{
    id:{type:DataTypes.INTEGER,autoIncrement:true,primaryKey:true},
    rating:{type:DataTypes.INTEGER,allowNull:false,validate:{min:1,max:5}},
    comment:{type:DataTypes.TEXT}
},{
    timestamps:true,
    freezeTableName: true
})
User.hasMany(Review);
Product.hasMany(Review);
Review.belongsTo(User, { foreignKey: { name: 'userId', allowNull: false } });
Review.belongsTo(Product, { foreignKey: { name: 'productId', allowNull: false } });

module.exports=Review;