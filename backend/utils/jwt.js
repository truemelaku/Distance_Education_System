const jwt = require('jsonwebtoken');

// Helper function to generate JWT
const generateToken = (user) => {
  const payload = {
    id: user._id,
    role: user.role,
  };

  // Sign the token with a secret and expiration time
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
};

module.exports = generateToken;
