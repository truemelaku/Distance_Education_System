// middleware/teacherAuth.js
const jwt = require('jsonwebtoken');
const Teacher = require('../models/Teacher');

const teacherAuth = async (req, res, next) => {
  const token = req.header('Authorization').replace('Bearer ', '');
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const teacher = await Teacher.findById(decoded.id);
    if (!teacher) {
      throw new Error();
    }
    req.teacher = teacher; // Attach teacher to the request
    next();
  } catch (error) {
    res.status(401).json({ message: 'Please authenticate as a teacher' });
  }
};

module.exports = teacherAuth;
