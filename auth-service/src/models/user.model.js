const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db'); 

const User = sequelize.define('User', {
  user_id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4, // Automatically generate a UUID if not provided
    primaryKey: true,
  },
  first_name: {
    type: DataTypes.STRING,
    allowNull: false, 
  },
  last_name: {
    type: DataTypes.STRING,
    allowNull: false, 
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false, // Required field
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false, // Required field
  },
  phone_number: {
    type: DataTypes.STRING(15), // Length restricted to 15 characters
    allowNull: true,
  },
  birthday_date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW, // Default to current timestamp
  },
  role: {
    type: DataTypes.STRING, // Cambiar a STRING en lugar de ENUM
    allowNull: false,
    defaultValue: 'user', // Valor predeterminado
  },
});

module.exports = User;