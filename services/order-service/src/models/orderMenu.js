import { DataTypes } from 'sequelize';
import sequelize from '../Config/db.js';
import Menu from './menu.js'; // Adjust the path if necessary
const OrderMenu = sequelize.define('OrderMenu', {
  order_id: {
    type: DataTypes.UUID,
    allowNull: false,
    primaryKey: true
  },
  menu_id: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true
  }
}, {
  tableName: 'Order-Menu',
  timestamps: false
});
OrderMenu.belongsTo(Menu, { foreignKey: 'menu_id' });
Menu.hasMany(OrderMenu, { foreignKey: 'menu_id' });

export default OrderMenu;
