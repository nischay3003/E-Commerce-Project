const sequelize = require('../config/db');       
const { DataTypes } = require('sequelize');      

const User = sequelize.define('user', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  first_name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  last_name: {
    type: DataTypes.STRING
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  },hashed_password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  phone_number: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  }
  
}, {
  timestamps: true,
  freezeTableName: true
});

module.exports = User;
