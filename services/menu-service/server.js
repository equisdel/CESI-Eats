require("dotenv").config({path: "../.env"});
const express = require('express');
const menuRouter = require('./src/routes/menu.routes.js');
const itemRouter = require('./src/routes/item.routes.js');
const {sequelize, connectDB} = require("./src/config/db.js")
const port = process.env.PORT || 5004;
const cors = require('cors');

//TEST
const Restaurant = require('./src/models/restaurant.model.js');
const User = require('./src/models/restaurant.model.js');
const Menu = require('./src/models/menu.model.js');
const Item = require('./src/models/item.model.js');

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

    await User.create({
      user_id: '1'
    });
    // After await sequelize.sync();
    await Restaurant.create({
      restaurant_id: '1',
      restaurant_name: 'Testaurant', // or any other fields your model requires
    });

    
    // Create 3 menus
    await Menu.create({
      restaurant_id: '1',
      menu_name: 'Breakfast Menu',
      menu_description: 'Morning meals'
    });
    await Menu.create({
      restaurant_id: '1',
      menu_name: 'Lunch Menu',
      menu_description: 'Afternoon meals'
    });
    await Menu.create({
      restaurant_id: '1',
      menu_name: 'Dinner Menu',
      menu_description: 'Evening meals'
    });

    // Create 3 items
    await Item.create({
      restaurant_id: '1',
      item_name: 'Pancakes',
      item_ingredients: 'Flour, Eggs, Milk',
      item_price: 5.99,
      item_photo: 'pancakes.jpg'
    });
    await Item.create({
      restaurant_id: '1',
      item_name: 'Burger',
      item_ingredients: 'Beef, Bun, Lettuce',
      item_price: 8.99,
      item_photo: 'burger.jpg'
    });
    await Item.create({
      restaurant_id: '1',
      item_name: 'Salad',
      item_ingredients: 'Lettuce, Tomato, Cucumber',
      item_price: 4.99,
      item_photo: 'salad.jpg'
    });

    app.listen(port, () => {
      console.log(`Server listening on port listening on port ${port}`)
    })

  } catch (error) {
    console.log(`Error starting the server: `, error)
  }
}

startServer();