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
  console.log("Inside of updateUser");
  const userId = req.params.user_id;
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
  console.log("Inside of deleteUser");
  const userId = req.params.user_id;

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
const getUser = async (req, res) => {
  console.log("Inside of getUser");
  const userId = req.params.user_id;
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


//------------------------------------------------------- GET NAME USER --------------------------------------------------------------------------
const getNameUser = async (req, res) => {
  console.log("Inside of getNameUser");
  const userId = req.params.user_id; 
  console.log("Fetching user info for ID:", userId);

  try {
    const user = await User.findByPk(userId, {
      attributes: ['first_name', 'last_name'], 
    });

    if (!user) {
      console.log("User not found for ID:", userId);
      return res.status(404).json({ error: 'User not found' });
    }

    // Combinar nombre y apellido
    const fullName = `${user.first_name} ${user.last_name}`;
    res.status(200).json({ name: fullName });
  } catch (error) {
    console.error('Error fetching user name:', error);
    res.status(500).json({ error: 'Failed to fetch user name' });
  }
};



//------------------------------------------------------- GET ROLE --------------------------------------------------------------------------
const getRole = async (req, res) => {
  console.log("Inside of getRole");
  console.log("Entre al getRole:");
  const userId = req.params.user_id; // Recibir el id_user directamente
  console.log("Fetching role for user ID:", userId);

  try {
    const user = await User.findByPk(userId, { 
      attributes: ['role'], 
    });

    if (!user) {
      console.log("User not found for ID:", userId);
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json({ role: user.role });
  } catch (error) {
    console.error('Error fetching role by user ID:', error);
    res.status(500).json({ error: 'Failed to fetch user role' });
  }
};


///------------------------------------------------------- GET NAME RESTAURANT BY ID --------------------------------------------------------------------------
const getNameRestaurant = async (req, res) => {
  console.log("Inside of getNameRestaurant");
  const restaurantId = req.params.restaurant_id;

  try {
    // Search the restaurant by its ID
    const user = await Restaurant.findByPk(restaurantId, {
      attributes: ['name'], 
    });

    if (!restaurant) {
      return res.status(404).json({ error: 'Restaurant not found' });
    }

    res.status(200).json({ name: restaurant.name });
  } catch (error) {
    console.error('Error fetching restaurant name:', error);
    res.status(500).json({ error: 'Failed to fetch restaurant name' });
  }
};


module.exports = {  
  getUsers, 
  updateUser, 
  deleteUser, 
  getUser, 
  getNameUser, 
  getRole,
  getNameRestaurant
};