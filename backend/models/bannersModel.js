const sequelize=require('../config/db');
const {DataTypes}=require('sequelize');
const Banner=sequelize.define('banner',{
    id:{type:DataTypes.INTEGER,autoIncrement:true,primaryKey:true},
    imageUrl:{type:DataTypes.STRING,allowNull:false},
    title:{type:DataTypes.STRING},
    link:{type:DataTypes.STRING,allowNull:false}
},{
    timestamps:true,
    freezeTableName: true
})
module.exports=Banner