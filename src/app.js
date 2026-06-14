const express = require("express");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: process.env.FRONTEND_URL || process.env.FRONTEND_URI || "http://localhost:3000",
    credentials: true,
  }),
);

// Routes

const authRoute = require("../src/routes/auth.route.js");
const productRoute = require("../src/routes/product.route.js");
const ErrorHandler = require("../src/middlewares/ErrorHandler.middleware.js");

app.use("/api/auth", authRoute);
app.use("/api/product", productRoute);

// Error Handler
app.use(ErrorHandler);

module.exports = app;
