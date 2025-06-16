require("dotenv").config({path: "../.env"});
const express = require('express');
const menuRouter = require('./src/routes/menu.routes.js');
const itemRouter = require('./src/routes/item.routes.js');
const {sequelize, connectDB} = require("./src/config/db.js")
const port = process.env.PORT || 5004;

//TEST
const Restaurant = require('./src/models/restaurant.model.js');
const User = require('./src/models/restaurant.model.js');


const app = express();
app.use(express.json())
app.use('/menu', menuRouter);   // All /menu requests go to menuRouter
app.use('/item', itemRouter);  // All /items requests go to itemRouter

async function startServer() {

  try {

    await connectDB()
    await sequelize.sync({ alter: true })
    console.log('DB synchronized')

    await User.create({
      user_id: '1'
    });
    // After await sequelize.sync();
    await Restaurant.create({
      restaurant_id: '1',
      restaurant_name: 'Testaurant', // or any other fields your model requires
    });

    app.listen(port, () => {
      console.log(`Server listening on port listening on port ${port}`)
    })

  } catch (error) {
    console.log(`Error starting the server: `, error)
  }
}

startServer();