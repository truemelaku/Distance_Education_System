const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');
const Teacher = require('../models/Teacher');
const Student = require('../models/Student');

const roleAuth = (roles) => async (req, res, next) => {
  const token = req.header('Authorization').replace('Bearer ', '');

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    let user = await Admin.findById(decoded.id) || 
               await Teacher.findById(decoded.id) || 
               await Student.findById(decoded.id);

    if (!user || !roles.includes(user.role)) {
      return res.status(403).json({ message: 'Access denied' });
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Authentication failed' });
  }
};

module.exports = roleAuth;
