// models/restaurant.model.js
const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Restaurant = sequelize.define('Restaurant', {
  restaurant_id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  owner_restaurant: {
    type: DataTypes.UUID,
    allowNull: false,  
    references: {
      model: "User",
      key: 'user_id',
    },
  },
  name: {
    type: DataTypes.STRING,
  },
  email: {
    type: DataTypes.STRING,
  },
  phone_number: {
    type: DataTypes.STRING(15),
  },
  address: {
    type: DataTypes.STRING,
  },
  open_hour: {
    type: DataTypes.STRING,
  },
  close_hour: {
    type: DataTypes.STRING,
  },
}, {
  tableName: 'Restaurant',
  timestamps: false,
});

module.exports = Restaurant;
