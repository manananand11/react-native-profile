const jwt = require('jsonwebtoken');

const generateToken = (phone) => {
  return jwt.sign({ phone }, process.env.SECRET_KEY);
};

const verifyToken = (token) => {
  return jwt.verify(token, process.env.SECRET_KEY);
};

module.exports = { generateToken, verifyToken };
