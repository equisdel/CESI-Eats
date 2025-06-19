import { DataTypes } from 'sequelize';
import sequelize from '../Config/db.js';
import OrderMenu from './orderMenu.js'; // Adjust the path if necessary
import Menu from './menu.js'; // Adjust the path if necessary
const Order = sequelize.define('Order', {
  order_id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4
  },
  client_id: {
    type: DataTypes.UUID,
    allowNull: false
  },
  delivery_address: {
    type: DataTypes.STRING,
    allowNull: false
  },
  pay_status: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  total_price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  accepted_by_restaurant: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
}, {
  tableName: 'Order',
  freezeTableName: true, // <<== 🔥 important
  timestamps: false
});
Order.hasMany(OrderMenu, { foreignKey: 'order_id' });
OrderMenu.belongsTo(Order, { foreignKey: 'order_id' });

export default Order;
