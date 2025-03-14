// routes/studentRoutes.js
const express = require('express');
const Student = require('../models/Student');
const { registerStudent, getTotalStudentCount, updateStudent,deleteStudent} = require('../controllers/studentController');
const upload = require('../middlewares/upload'); // Import the upload middleware
const router = express.Router();


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

module.exports = router;
