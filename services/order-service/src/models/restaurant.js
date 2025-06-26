// models/restaurant.js
import { DataTypes } from 'sequelize';
import sequelize from '../Config/db.js';

const Restaurant = sequelize.define('Restaurant', {
  restaurant_id: {
    type: DataTypes.UUID,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING
  }
}, {
  tableName: '"Restaurant"', // 🔥 Ceci force Sequelize à utiliser exactement le nom "Restaurant"
  timestamps: false
});

export default Restaurant;
