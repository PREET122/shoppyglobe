import User from '../models/User.js';
import asyncHandler from '../middleware/asyncHandler.js';
import generateToken from '../utils/generateToken.js';

const buildAuthResponse = (user) => ({
  message: 'Authentication successful',
  token: generateToken(user._id),
  user: {
    id: user._id,
    name: user.name,
    email: user.email,
  },
});

export const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    const error = new Error('User already exists');
    error.statusCode = 409;
    throw error;
  }

  const user = await User.create({ name, email, password });

  res.status(201).json({
    message: 'User registered successfully',
    token: generateToken(user._id),
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
    },
  });
});

export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user || !(await user.comparePassword(password))) {
    const error = new Error('Invalid email or password');
    error.statusCode = 401;
    throw error;
  }

  res.json(buildAuthResponse(user));
});
