import { DataTypes } from 'sequelize';
import sequelize from '../Config/db.js';

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

export default Menu;
