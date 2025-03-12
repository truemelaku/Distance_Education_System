const express = require('express');
const router = express.Router();
const { registerTeacher } = require('../controllers/teacherController');
const authMiddleware = require('../middlewares/authMiddleware'); // Import auth middleware
const requireRole = require('../middlewares/requireRole'); // Import role-based middleware

// Only authenticated users with the 'admin' role can access this route
router.post('/register', authMiddleware, requireRole('admin'), registerTeacher);

module.exports = router;
