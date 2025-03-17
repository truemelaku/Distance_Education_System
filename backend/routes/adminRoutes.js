const express = require('express');
const router = express.Router();
const { registerAdmin } = require('../controllers/adminController');
const authMiddleware = require('../middlewares/authMiddleware');
const requiredRole = require('../middlewares/requireRole');

// POST route to register a new admin (accessible by existing admins or super admins)
router.post('/register', authMiddleware, requiredRole('admin'), registerAdmin);

module.exports = router;
