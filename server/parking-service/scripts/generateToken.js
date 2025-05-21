const jwt = require('jsonwebtoken');
require('dotenv').config();

const generateToken = (userId) => {
  const token = jwt.sign(
    { userId },
    process.env.JWT_SECRET,
    { expiresIn: '24h' }
  );
  console.log(`JWT Token: ${token}`);
  
  return token;
};

module.exports = generateToken;
