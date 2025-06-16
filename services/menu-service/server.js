require("dotenv").config({path: "../.env"});
const express = require('express');
const menuRouter = require('./routes/menu.routes');
const itemRouter = require('./routes/item.routes');
const {sequelize, connectDB} = require("./src/config/db.js")
const port = process.env.PORT || 5004;

const app = express();
app.use(express.json())
app.use('/menu', menuRouter);   // All /menu requests go to menuRouter
app.use('/items', itemRouter);  // All /items requests go to itemRouter

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