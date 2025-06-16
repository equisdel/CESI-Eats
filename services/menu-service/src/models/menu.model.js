const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Menu = sequelize.define('Menu', {
  menu_id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4, // Automatically generate a UUID if not provided
    primaryKey: true,
  },
  restaurant_id: {
    type: DataTypes.UUID,
    allowNull: false, // Each menu must belong to a restaurant
  },
  menu_name: {
    type: DataTypes.STRING,
    allowNull: false, // Menu name is required
  },
  menu_description: {
    type: DataTypes.STRING,
    allowNull: true, // Optional field
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  }, 
}, {
  tableName: 'Menu',
}
);

module.exports = Menu;