require("dotenv").config({path: "../.env"});
const express = require('express');
const menuRouter = require('./src/routes/menu.routes.js');
const itemRouter = require('./src/routes/item.routes.js');
const {sequelize, connectDB} = require("./src/config/db.js")
const port = process.env.PORT || 5004;
const cors = require('cors');

//TEST
//const Restaurant = require('./src/models/restaurant.model.js');
//const User = require('./src/models/user.model.js');

const app = express();
app.use(express.json())
app.use(cors())
app.use('/menu', menuRouter);   // All /menu requests go to menuRouter
app.use('/item', itemRouter);  // All /items requests go to itemRouter

async function startServer() {

  try {

    await connectDB()
    await sequelize.sync({ alter: true })
    console.log('DB synchronized')

    app.listen(port, () => {
      console.log(`Server listening on port listening on port ${port}`)
    })

  } catch (error) {
    console.log(`Error starting the server: `, error)
  }
}

startServer();