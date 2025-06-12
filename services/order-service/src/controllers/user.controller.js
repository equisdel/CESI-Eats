const User = require('../models/user.model');

const createUser = async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).json({ message: 'User saved' });
  } catch (err) {
    console.error("❌ Error while saving user:", err);
    res.status(500).json({ error: 'Error saving user' });
  }
};

module.exports = { createUser }; // 👈 OBLIGATOIRE
