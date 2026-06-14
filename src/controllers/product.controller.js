const productModel = require("../models/product.model");
const ApiError = require("../utils/ApiError");
const asyncHandler = require("../utils/asyncHandler");
const ApiResponse = require("../utils/ApiResponse")

const createProduct = asyncHandler(async (req, res) => {
  const { title, description, price, stoke, image } = req.body;
console.log("hii",title)
  if (
    title == "" ||
    description == "" ||
    price == 0 ||
    stoke == 0 ||
    image == ""
  ) {
    throw new ApiError(400, "All fields are required");
  }

  const existingProduct = await productModel.findOne({ title });

  if (existingProduct) {
    throw new ApiError(400, "Product already exists");
  }

  const product = await productModel.create({
    title,
    description,
    price,
    stoke,
    image,
  });

  if (!product) {
    throw new ApiError(400, "Product not created");
  }

  res.status(201).json(new ApiResponse(201, product, "Product created"));
});

const updateProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const productData = req.body;

  if (!id) {
    throw new ApiError(400, "something went wrong");
  }

  const product = await productModel.findByIdAndUpdate(
    { _id: id },
    productData,
    { new: true },
  );

  res
    .status(201)
    .json(new ApiResponse(201, product, "Product deleted successfully"));
});
const getAllProducts = asyncHandler(async (req, res) => {
  const products = await productModel.find();

  res
    .status(201)
    .json(new ApiResponse(201, products, "Products get successfully"));
});
const getProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!id) {
    throw new ApiError(400, "something went wrong");
  }

  const products = await productModel.findById({ _id: id });

  if (!products) {
    throw new Error(204, "No products found");
  }

  res
    .status(200)
    .json(new ApiResponse(200, products, "Products got successfully"));
});

const deleteProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!id) {
    throw new ApiError(400, "something went wrong");
  }

  const product = await productModel.findByIdAndDelete({ _id: id });

  res
    .status(200)
    .json(new ApiResponse(200, product, "Product deleted successfully"));
});

module.exports = {
  createProduct,
  updateProduct,
  getAllProducts,
  getProduct,
  deleteProduct,
};
