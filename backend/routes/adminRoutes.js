const express = require('express');
const router = express.Router();

const { registerAdmin,adminProfile} = require('../controllers/adminController');
const authMiddleware = require('../middlewares/authMiddleware');
const requiredRole = require('../middlewares/requireRole');
const authenticateToken = require('../middlewares/authenticateToken');


// POST route to register a new admin (accessible by existing admins or super admins)
router.post('/register', authMiddleware, requiredRole('admin'), registerAdmin);
router.get('/profile', authenticateToken,adminProfile) 
module.exports = router;
