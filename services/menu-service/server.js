require("dotenv").config({path: "../.env"});
const express = require('express');
const {sequelize, connectDB} = require("./src/config/db.js")
const app = express();
const port = process.env.PORT || 5000;

app.use(express.json())

require('./src/routes/auth.routes')(app);

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