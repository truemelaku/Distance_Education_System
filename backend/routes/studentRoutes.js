

const express = require('express');
const Student = require('../models/Student');
const jwt = require('jsonwebtoken');
const { registerStudent, getTotalStudentCount, updateStudent,deleteStudent,studentProfile} = require('../controllers/studentController');
const upload = require('../middlewares/upload'); // Import the upload middleware
const authenticateToken= require('../middlewares/authenticateToken');
const router = express.Router();
require('dotenv').config();
const jwtSecret = process.env.JWT_SECRET;


router.post('/register', upload.single('certificate'), registerStudent);
// Fetch all students
router.get('/', async (req, res) => {
    try {
      const students = await Student.find(); // Fetch all students from the database
      
      res.status(200).json(students);        // Return students as JSON
    } catch (error) {
      console.error("Error fetching students:", error);
      res.status(500).json({ message: 'Failed to retrieve students' });
    }
  });
  router.delete('/:id', deleteStudent);

// PUT: Update student details by studentId
router.put('/:id', updateStudent);
  // counting
  router.get("/count", getTotalStudentCount);

  //profiles
// Middleware for authenticating token


// Profile API
router.get('/profile', authenticateToken,studentProfile) 
module.exports = router;
