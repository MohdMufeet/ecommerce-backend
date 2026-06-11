const User = require("../models/user.model");
const asyncHandler = require("../utils/asyncHandler");
const bcrypt = require("bcrypt");
const ApiError = require("../utils/ApiError");
const jwt = require("jsonwebtoken");
const ApiResponse = require("../utils/ApiResponse");

const signupUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    throw new ApiError(400, "All fields are required");
  }

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    throw new ApiError(400, "User already exists");
  }
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({ name, email, password: hashedPassword });

  if (!user) {
    throw new ApiError(400, "User not created");
  }
  return res.status(201).json(new ApiResponse(201, user, "User created"));
});

const loginUser = asyncHandler(async (req, res) => {
  
    const { email, password } = req.body;

    if (!email || !password) {
      throw new ApiError(400, "All fields are required");
    }

    const user = await User.findOne({ email });

    if (!user) {
      throw new ApiError(400, "User not found");
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      throw new ApiError(400, "Invalid credentials");
    }

    return res.status(200).json(new ApiResponse(200, user, "Login successful"));
    
  
});

module.exports = {
  signupUser,
  loginUser,
};
