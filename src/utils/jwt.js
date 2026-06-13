const jwt = require("jsonwebtoken");

SECRET_KEY = process.env.SECRET_KEY;

const generateToken = (token) => {
  try {
    const genratedToken = jwt.sign(token, SECRET_KEY, { expiresIn: "7d" });
    return genratedToken;
  } catch (err) {
    next(err);
  }
};

const checkToken = (token) => {
  try {
    const verifiedToken = jwt.verify(token, SECRET_KEY);
    return verifiedToken;
  } catch (err) {
    next(err);
  }
};

module.exports = {
  generateToken,
};
