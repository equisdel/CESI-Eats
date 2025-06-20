const User = require('../models/user.model');
const Restaurant = require('../models/restaurant.model');

//------------------------------------------------------- GET USERS --------------------------------------------------------------------------
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
  console.log("I'm in get info for", userId);

  try {
    const user = await User.findByPk(userId, {
      attributes: { exclude: ['role', 'created_at','password'] }
    });

    if (!user) {
      console.log("I didn't find the user");
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ error: 'Failed to fetch user' });
  }
};

//------------------------------------------------------- GET INFO USER BY EMAIL --------------------------------------------------------------------------
const getUserByEmail = async (req, res) => {
  const userEmail = decodeURIComponent(req.params.email);
  console.log("I'm in get info for email:", userEmail);

  try {
    const user = await User.findOne({
      where: { email: userEmail }, 
      attributes: { exclude: ['role', 'created_at', 'password'] }, 
    });

    if (!user) {
      console.log("I didn't find the user");
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ error: 'Failed to fetch user' });
  }
};


//------------------------------------------------------- GET NAME USER --------------------------------------------------------------------------
const getNameUser = async (req, res) => {
  const userEmail = decodeURIComponent(req.params.email);
  console.log("I'm in get info for email:", userEmail);

  try {
    const user = await User.findOne({
      where: { email: userEmail },
      attributes: ['first_name', 'last_name'], // Get name and surname
    });

    if (!user) {
      console.log("I didn't find the user");
      return res.status(404).json({ error: 'User not found' });
    }

    // Put name and surname togheter
    const fullName = `${user.first_name} ${user.last_name}`;
    res.status(200).json({ name: fullName });
  } catch (error) {
    console.error('Error fetching user name:', error);
    res.status(500).json({ error: 'Failed to fetch user name' });
  }
};

//------------------------------------------------------- GET ID USER BY EMAIL --------------------------------------------------------------------------
const getUserId = async (req, res) => {
  const userEmail = decodeURIComponent(req.params.email);

  try {
    const user = await User.findOne({
      where: { email: userEmail },
      attributes: ['user_id'], 
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json({ user_id: user.user_id });
  } catch (error) {
    console.error('Error fetching user ID:', error);
    res.status(500).json({ error: 'Failed to fetch user ID' });
  }
};

//------------------------------------------------------- GET ID RESTAURANT BY EMAIL --------------------------------------------------------------------------
const getRestaurantId = async (req, res) => {
  const userEmail = decodeURIComponent(req.params.email);

  try {
    const user = await User.findOne({
      where: { email: userEmail },
      attributes: ['user_id'], 
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Search the restaurant associate to the restaurant owner
    const restaurant = await Restaurant.findOne({
      where: { owner_restaurant: user.user_id },
      attributes: ['restaurant_id'], 
    });

    if (!restaurant) {
      return res.status(404).json({ error: 'Restaurant not found for this user' });
    }

    res.status(200).json({ restaurant_id: restaurant.restaurant_id });
  } catch (error) {
    console.error('Error fetching restaurant ID:', error);
    res.status(500).json({ error: 'Failed to fetch restaurant ID' });
  }
};

//------------------------------------------------------- GET ROLE BY EMAIL --------------------------------------------------------------------------
const getRoleByEmail = async (req, res) => {
  const userEmail = decodeURIComponent(req.params.email);
  console.log("Fetching role for email:", userEmail);

  try {
    const user = await User.findOne({
      where: { email: userEmail },
      attributes: ['role'], 
    });

    if (!user) {
      console.log("User not found for email:", userEmail);
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json({ role: user.role });
  } catch (error) {
    console.error('Error fetching role by email:', error);
    res.status(500).json({ error: 'Failed to fetch user role' });
  }
};

///------------------------------------------------------- GET NAME RESTAURANT BY EMAIL --------------------------------------------------------------------------
const getNameRestaurant = async (req, res) => {
  const userEmail = decodeURIComponent(req.params.email);

  try {
    const user = await User.findOne({
      where: { email: userEmail },
      attributes: ['user_id'], 
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Search the restaurant associate to the restaurant owner
    const restaurant = await Restaurant.findOne({
      where: { owner_restaurant: user.user_id },
      attributes: ['name'], 
    });

    if (!restaurant) {
      return res.status(404).json({ error: 'Restaurant not found for this user' });
    }

    res.status(200).json({ name: restaurant.name });
  } catch (error) {
    console.error('Error fetching restaurant ID:', error);
    res.status(500).json({ error: 'Failed to fetch restaurant name' });
  }
};

module.exports = {  
  getUsers, 
  updateUser, 
  deleteUser, 
  getUserById, 
  getUserByEmail, 
  getNameUser, 
  getUserId, 
  getRestaurantId,
  getRoleByEmail,
  getNameRestaurant
};