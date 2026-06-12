const express = require("express");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  }),
);

// Routes

const authRoute = require("../src/routes/auth.route.js");
const ErrorHandler = require("../src/middlewares/ErrorHandler.middleware.js");

app.use("/api/auth", authRoute);

// Error Handler
app.use(ErrorHandler);

module.exports = app;
