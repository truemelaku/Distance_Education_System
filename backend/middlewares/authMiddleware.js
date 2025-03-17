const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const authHeader = req.header('Authorization');
  
  // Check if no token is provided
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
    // Extract the token from 'Bearer <token>'
    const token = authHeader.split(' ')[1];
    console.log("Authorization Header:", authHeader); // Debugging: Log the full authorization header
    console.log("Extracted Token:", token);           // Debugging: Log the extracted token
    console.log("JWT Secret (from authMiddleware):", process.env.JWT_SECRET); // Debugging: Log the secret

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Ensure correct secret is used
    console.log("Decoded Token:", decoded);                  // Debugging: Log the decoded token
    
    // Attach decoded user to the request object
    req.user = decoded;

    next();
  } catch (err) {
    console.error("Token validation error:", err); // Debugging: Log the error
    return res.status(401).json({ message: 'Token is not valid' });
  }
};

module.exports = authMiddleware;
