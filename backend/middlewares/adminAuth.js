const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');
const adminAuth = async (req, res, next) => {
  try {
    const authHeader = req.header('Authorization');
    if (!authHeader) {
      return res.status(401).json({ message: 'Authorization header missing' });
    }
    
    console.log('Authorization header received:', authHeader);
    
    const token = authHeader.replace('Bearer ', '');
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('Decoded JWT:', decoded); // Log the decoded JWT to verify its contents
    
    if (decoded.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied' }); // Ensure the user is an admin
    }
    
    req.admin = await Admin.findById(decoded.id); // Assuming the token contains the admin's ID
    if (!req.admin) {
      return res.status(404).json({ message: 'Admin not found' });
    }
    
    next(); // Proceed to the next middleware
  } catch (error) {
    console.error('Authorization error:', error.message);
    return res.status(401).json({ message: 'Invalid token' });
  }
};


module.exports = adminAuth;
