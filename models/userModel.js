const {Sequelize,DataTypes}=require('sequelize');
require('dotenv').config();


const sequelize= new Sequelize(process.env.DATABASE_URL);
const User= sequelize.define('User',{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true

    },
    first_name:{
        type:DataTypes.STRING,
        allowNull:false
    
    },
    last_name:{
        type:DataTypes.STRING,
        
    },
    email:{
        type:DataTypes.STRING,
        unique:true,
        allowNull:false
    },
    hashed_password:{
        type:DataTypes.STRING,
        allowNull:false
    },
    phone_number:{
        type:DataTypes.STRING,
        allowNull:false,
        unique:true
    }
},{
    timestamps:true
});
