const User = require('../models/user.model');
const Restaurant = require('../models/restaurant.model');

//------------------------------------------------------- CREATE USER --------------------------------------------------------------------------
const createUser = async (req, res) => {
  try {
    const { first_name, last_name, email, password, phone_number, birthday_date, role } = req.body;

    if (!first_name || !last_name || !email || !password || !birthday_date) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const newUser = await User.create({
      first_name,
      last_name,
      email,
      password, 
      phone_number,
      birthday_date,
      role: role || 'user',
    });

    res.status(201).json({ message: 'User created successfully', user: newUser });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'Failed to create user' });
  }
};

//------------------------------------------------------- GET USER --------------------------------------------------------------------------
const getUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
};

//------------------------------------------------------- UPDATE USER --------------------------------------------------------------------------
const updateUser = async (req, res) => {
  const userId = req.params.id;
  const { first_name, last_name, email, password, phone_number, birthday_date, role } = req.body;

  try {
    // Search the user for ID
    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Only update if there are changes in the body
    await user.update({
      first_name: first_name ?? user.first_name,
      last_name: last_name ?? user.last_name,
      email: email ?? user.email,
      password: password ?? user.password,
      phone_number: phone_number ?? user.phone_number,
      birthday_date: birthday_date ?? user.birthday_date,
    });

    res.status(200).json({ message: 'User updated successfully', user });
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ error: 'Failed to update user' });
  }
};

//------------------------------------------------------- DELETE USER --------------------------------------------------------------------------
const deleteUser = async (req, res) => {
  const userId = req.params.id;

  try {
    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    await user.destroy();

    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ error: 'Failed to delete user' });
  }
};

//------------------------------------------------------- GET INFO USER --------------------------------------------------------------------------
const getUserById = async (req, res) => {
  const userId = req.params.id;

  try {
    const user = await User.findByPk(userId, {
      attributes: { exclude: ['role', 'created_at'] }
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ error: 'Failed to fetch user' });
  }
};

//------------------------------------------------------- CREATE RESTAURANT FOR RESTAURANT OWNER -------------------------------------------------
const createRestaurantIfProductOwner = async (req, res) => {
  const userId = req.params.userId;
  const { name, email, phone_number, adress, open_hour, close_hour } = req.body;

  try {
    // Find the restaurant owner
    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found'+userId });
    }

    if (user.role !== 'restaurantOwner') {
      return res.status(403).json({ error: 'User is not authorized to create a restaurant' });
    }

    // Create a restaurant related to the owner
    try {
      const newRestaurant = await Restaurant.create({
        owner_restaurant: userId,
        name,
        email,
        phone_number,
        adress,
        open_hour,
        close_hour,
      });
    } catch (error) {
      console.error('Sequelize error:', error);
    } 

    res.status(201).json({ message: 'Restaurant created successfully', restaurant: newRestaurant });
  } catch (error) {
    console.error('Error creating restaurant:', error);
    res.status(500).json({ error: 'Failed to create restaurant' });
  }
};


module.exports = { createUser, getUsers, updateUser, deleteUser, getUserById, createRestaurantIfProductOwner };


