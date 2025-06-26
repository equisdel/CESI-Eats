// models/menu.js
import { DataTypes } from 'sequelize';
import sequelize from '../Config/db.js';
import Restaurant from './restaurant.js'; // 🔥 import du nouveau modèle

const Menu = sequelize.define('Menu', {
  menu_id: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  restaurant_id: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  menu_price: {
    type: DataTypes.DECIMAL,
    allowNull: false
  },
  menu_photo: {
    type: DataTypes.TEXT,
    allowNull: true
  }
}, {
  tableName: 'menu',
  timestamps: false
});

// 🔁 Association
Menu.belongsTo(Restaurant, { foreignKey: 'restaurant_id' });
Restaurant.hasMany(Menu, { foreignKey: 'restaurant_id' });

export default Menu;
