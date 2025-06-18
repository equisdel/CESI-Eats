const express = require('express');
const { sequelize, connectDB } = require('./config/db');
const userRoutes = require('./routes/user.routes');

const app = express();
app.use(express.json());

async function startServer() {
  try {
    await connectDB();
    await sequelize.sync({ alter: true });
    //await sequelize.sync();
    console.log('Database synchronized.');

    app.use('/users', userRoutes);

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Error starting the server:', error);
  }
}

startServer();
