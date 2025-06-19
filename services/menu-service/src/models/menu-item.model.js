const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const MenuItem = sequelize.define('MenuItem', {
  menu_id: {
    type: DataTypes.UUID,
    allowNull: false,
    primaryKey: true,
    references: {
      model: 'Menu',
      key: 'menu_id'
    }
  },
  item_id: {
    type: DataTypes.UUID,
    allowNull: false,
    primaryKey: true,
    references: {
      model: 'item',
      key: 'item_id'
    }
  }
}, {
  tableName: 'Menu-Item', // Optional: matches your SQL table name
  timestamps: false ,      // No createdAt/updatedAt columns
  freezeTableName: true ,
});

module.exports = MenuItem;