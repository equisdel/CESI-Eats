const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Item = sequelize.define('Item', {
  item_id: {
    type: DataTypes.UUIDV4,
    defaultValue: DataTypes.UUIDV4, // Automatically generate a UUID if not provided
    primaryKey: true,
  },
  restaurant_id: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'Restaurant',
      key: 'restaurant_id',
    },
    onDelete: 'CASCADE',
  },
  item_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  item_ingredients: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  item_price: {
    type: DataTypes.DECIMAL,
    allowNull: false,
  },
  item_photo: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
}, {
  tableName: 'Item',
  timestamps: false,
});

module.exports = Item;