const jwt = require("jsonwebtoken");

SECRET_KEY = process.env.SECRET_KEY;

const generateToken = (userId) => {
  try {
    const genratedToken = jwt.sign({_id:userId}, SECRET_KEY, { expiresIn: "7d" });
    return genratedToken;
  } catch (err) {
    throw new Error(err);

  }
};

const checkToken = (userId) => {
  try {
    const verifiedToken = jwt.verify({_id:userId}, SECRET_KEY);
    return verifiedToken;
  } catch (err) {
    throw new Error(err);
  }
};

module.exports = {
  generateToken,
};
