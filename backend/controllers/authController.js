const User = require('../models/User.js');
const { generateToken } = require('../utils/jwt.js');
const BadRequestError = require('../errors/BadRequestError.js');
const UnauthorizedError = require('../errors/UnauthorizedError.js');
exports.register = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;

    // Check if user exists
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      throw new BadRequestError(" Username or email is already in use.");
    }

    // Create user
    const user = await User.create({ username, email, password, role });
    const token = generateToken(user._id, user.role);

    res.status(201).json({
      _id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
      token
    });
  } catch (err) {
    res.status(500).json({ error: 'Registration failed' });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    
    if (!user || !(await user.comparePassword(password))) {
      throw new UnauthorizedError("Invalid credentials.");
    }

    const token = generateToken(user._id, user.role);
    res.json({
      _id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
      token
    });
  } catch (err) {
    res.status(500).json({ error: 'Login failed' });
  }
};