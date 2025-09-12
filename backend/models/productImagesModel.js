const sequelize=require('../config/db');
const {DataTypes}=require('sequelize');
const Product=require('../models/productModel');
const ProductImage=sequelize.define('product_image',{
    id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true
    },
    imageUrl:{
        type:DataTypes.STRING
    }


},{
    timestamps:true,
    freezeTableName: true
})
Product.hasMany(ProductImage, { foreignKey: 'productId' ,as:"images" });
ProductImage.belongsTo(Product, { foreignKey: { name: 'productId', allowNull: false } });

module.exports=ProductImage;