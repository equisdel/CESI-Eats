const { Sequelize } = require('sequelize');

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
  const maxRetries = 10;
  let attempt = 0;

  while (attempt < maxRetries) {
    try {
      await sequelize.authenticate();
      console.log('✅ Database connected successfully.');
      break;
    } catch (error) {
      console.warn(`❌ Database connection failed (attempt ${attempt + 1}/${maxRetries}):`, error.message);
      attempt++;
      await new Promise((res) => setTimeout(res, 3000)); // attend 3 secondes
    }
  }

  if (attempt === maxRetries) {
    console.error('🚨 Could not connect to the database after multiple attempts. Exiting.');
    process.exit(1);
  }
};


module.exports = { sequelize, connectDB };