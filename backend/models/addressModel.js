const sequelize=require('../config/db');
const {DataTypes}=require('sequelize');
const User = require('./userModel');


const Address=sequelize.define('address',
    {
        id:{
            type:DataTypes.INTEGER,
            primaryKey:true,
            autoIncrement:true
        },
        user_id:{
            type:DataTypes.INTEGER,
            allowNull:false,
            references:{
                model:User,
                key:'id'
            }
        },
        street:{
            type:DataTypes.STRING,
            allowNull:false

        },
        city:{
            type:DataTypes.STRING,
            allowNull:false
        },
        state:{
            type:DataTypes.STRING,
            allowNull:false
        },
        pinCode:{
            type:DataTypes.STRING,
            allowNull:false
        },
        country:{
            type:DataTypes.STRING,
            allowNull:false,
        
        }




    },{
        timestamps:true,
        freezeTableName:true
    }
)
Address.belongsTo(User,{foreignKey:'user_id'});
User.hasMany(Address,{foreignKey:'user_id'});
module.exports=Address;