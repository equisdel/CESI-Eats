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
  const MAX_RETRIES = 10;
  const RETRY_DELAY_MS = 3000;

  for (let i = 1; i <= MAX_RETRIES; i++) {
    try {
      await sequelize.authenticate();
      console.log('✅ Database connected successfully.');
      return;
    } catch (error) {
      console.error(`❌ Attempt ${i} - Failed to connect to database: ${error.message}`);
      if (i === MAX_RETRIES) {
        console.error('🚨 Could not connect after max retries. Exiting.');
        process.exit(1);
      }
      await new Promise((res) => setTimeout(res, RETRY_DELAY_MS));
    }
  }
};

module.exports = { sequelize, connectDB };