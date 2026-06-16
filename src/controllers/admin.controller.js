const AdminModel = require("../models/admin.model");
const asyncHandler = require("../utils/asyncHandler");
const bcrypt = require("bcrypt");
const ApiError = require("../utils/ApiError");
const ApiResponse = require("../utils/ApiResponse");
const { generateToken } = require("../utils/jwt");

const signupAdmin = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    throw new ApiError(400, "All fields are required");
  }

  const existingAdmin = await AdminModel.findOne({ email });

  if (existingAdmin) {
    throw new ApiError(400, "Admin already exists");
  }
  const hashedPassword = await bcrypt.hash(password, 10);

  const Admin = await AdminModel.create({ name, email, password: hashedPassword });

  if (!Admin) {
    throw new ApiError(400, "Admin not created");
  }
  const token = generateToken(Admin._id);
   const updatedAdmin = {
    ...Admin._doc,
    token
  }
  Admin.token = token;
  console.log("Admin",Admin);

  res.status(201).json(new ApiResponse(201, updatedAdmin, "Admin created"));
});

const loginAdmin = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
      throw new ApiError(400, "All fields are required");
    }

    const Admin = await AdminModel.findOne({ email });

    if (!Admin) {
      throw new ApiError(400, "Admin not found");
    }

    const isMatch = await bcrypt.compare(password, Admin.password);

    if (!isMatch) {
      throw new ApiError(400, "Invalid credentials");
    }

    const token = generateToken(Admin._id);
    Admin.token = token;
     const updatedAdmin = {
    ...Admin._doc,
    token
  }
  
  res.status(200).json(new ApiResponse(200, updatedAdmin, "Login successful"));
    
  
});

module.exports = {
  signupAdmin,
  loginAdmin,
};
