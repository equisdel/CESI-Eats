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
      attributes: { exclude: ['role', 'created_at'] }
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
const getNameUserById = async (req, res) => {
  const userId = req.params.id;
  console.log("I'm in get info for", userId);

  try {
    const user = await User.findByPk(userId, {
      attributes: ['name'] 
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


module.exports = { getUsers, updateUser, deleteUser, getUserById, getNameUserById };


