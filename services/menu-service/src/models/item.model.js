const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Item = sequelize.define('Item', {
  item_id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    field: 'item_id' // 🔧 ajout explicite
  },
  restaurant_id: {
    type: DataTypes.UUID,
    allowNull: false,
    field: 'restaurant_id', // ✅ important pour la correspondance avec ta BDD
    references: {
      model: 'Restaurant',
      key: 'restaurant_id',
    },
    onDelete: 'CASCADE',
  },
  item_name: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'name',
  },
  item_ingredients: {
    type: DataTypes.STRING,
    allowNull: true,
    field: 'ingredients',
  },
  item_price: {
    type: DataTypes.DECIMAL,
    allowNull: false,
    field: 'price',
  },
  item_photo: {
    type: DataTypes.TEXT,
    allowNull: true,
    field: 'photo',
  },
}, {
  tableName: 'item',
  timestamps: false,
  freezeTableName: true
});

module.exports = Item;
