const jwt = require('jsonwebtoken');

// Generate JWT token
const generateToken = (user) => {
  console.log("JWT Secret (from jwt.js):", process.env.JWT_SECRET);

  return jwt.sign(
    { id: user._id, role: user.role },    // Payload
    process.env.JWT_SECRET,               // Secret from .env
    { expiresIn: '1h' }                   // Expiration time
  );
};

module.exports = { generateToken };
