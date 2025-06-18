import { DataTypes } from 'sequelize';
import sequelize from '../Config/db.js'; // adapte le chemin si besoin

const Menu = sequelize.define('Menu', {
  menu_id: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  restaurant_id: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  price: DataTypes.DECIMAL,
  photo: DataTypes.TEXT,
}, {
  tableName: 'menu',
  timestamps: false
});

export default Menu;
