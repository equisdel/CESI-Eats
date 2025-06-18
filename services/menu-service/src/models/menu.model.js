const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Menu = sequelize.define('Menu', {
  menu_id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  restaurant_id: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  menu_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  menu_description: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  menu_price: {                    // ✅ AJOUT ICI
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    defaultValue: 0.00
  },
  menu_photo: {
    type: DataTypes.STRING, // 
    allowNull: true,
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  }, 
}, {
  tableName: 'menu',
  freezeTableName: false,
  timestamps: false
});


module.exports = Menu;