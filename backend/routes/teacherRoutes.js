const express = require('express');
const router = express.Router();
const TeacherController = require('../controllers/teacherController');
const adminAuth  = require('../middlewares/adminAuth'); // Import auth middleware
//const requireRole = require('../middlewares/requireRole'); // Import role-based middleware

// Only authenticated users with the 'admin' role can access this route
router.post('/register', adminAuth , TeacherController.registerTeacher);
router.get('/teachers', TeacherController.getAllTeachers);
router.delete('/:id', TeacherController.deleteTeacher);
module.exports = router;