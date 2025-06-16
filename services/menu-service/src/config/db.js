/*const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('cesi_global', 'user', 'password', {
  host: 'postgres', 
  port: 5432,      
  dialect: 'postgres',
  logging: false,   
  dialectOptions: {
    ssl: false,    
  },
});

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connected successfully.');
  } catch (error) {
    console.error('Database connection failed:', error);
    process.exit(1);
  }
};

module.exports = { sequelize, connectDB };*/
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('sqlite::memory:'); // In-memory SQLite DB

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connected to in-memory SQLite DB');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

module.exports = { sequelize, connectDB };
