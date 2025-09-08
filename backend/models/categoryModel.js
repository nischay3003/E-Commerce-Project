const sequelize=require('../config/db');
const {DataTypes}=require('sequelize');

const Category=sequelize.define('category',
    {
        id:{
            type:DataTypes.INTEGER,
            autoIncrement:true,
            primaryKey:true
        },
        category_name:{
            type:DataTypes.STRING,
            allowNull:false,
            unique:true
        },
        imageUrl:{
            type:DataTypes.STRING,
            allowNull:false
        }
    },
    {
        timestamps:false,
        freezeTableName:true
    }
)
module.exports=Category;