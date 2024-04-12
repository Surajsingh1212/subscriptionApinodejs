const User = require('../models/userModel');

async function registerUser(req, res) {
  const { name, email, password } = req.body;

  try {
    const isExistingUser = await User.findOne({ email });
    if (isExistingUser) {
      return res.status(400).json({ message: 'user already exists' });
    }
    const newUser = new User({ name, email, password });
    await newUser.save();

    res.json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ message: 'Failed to register user' });
  }
}

module.exports = {
  registerUser
};