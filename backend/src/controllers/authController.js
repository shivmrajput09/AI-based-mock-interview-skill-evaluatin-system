const jwt = require('jsonwebtoken');
const User = require('../models/User');

const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: '7d' });
};

exports.register = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Please provide name, email and password.' });
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(409).json({ message: 'Email already in use.' });
  }

  const user = await User.create({ name, email, password });
  if (!user) return res.status(400).json({ message: 'Invalid data.' });

  res.status(201).json({
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
    },
    token: generateToken(user._id),
  });
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: 'Please provide email and password.' });
  }

  const user = await User.findOne({ email });
  if (!user || !(await user.matchPassword(password))) {
    return res.status(401).json({ message: 'Invalid credentials.' });
  }

  res.json({
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
    },
    token: generateToken(user._id),
  });
};

exports.getProfile = async (req, res) => {
  const user = await User.findById(req.user.id).select('-password');
  if (!user) return res.status(404).json({ message: 'User not found.' });
  res.json({ user });
};
