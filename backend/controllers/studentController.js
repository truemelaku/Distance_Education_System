const bcrypt = require('bcrypt');
const Student = require('../models/Student');
const { generateToken } = require('../utils/jwt'); // Assuming you have a utility for generating JWT tokens
const upload = require('../middlewares/upload'); // Assuming multer setup for file uploads

// Student registration controller
exports.registerStudent = async (req, res) => {
  const { firstName, middleName, lastName, email, password, department, gender, phoneNumber, agreement } = req.body;
  const certificate = req.file ? req.file.path : null; // File upload handling

  try {
    // Check if the email already exists
    const existingStudent = await Student.findOne({ email });
    if (existingStudent) {
      return res.status(400).json({ message: 'Email already exists. Please use a different email.' });
    }

    // Generate a unique student ID
    const randomDigits = Math.floor(1000 + Math.random() * 9000);
    const studentId = `bdu130${randomDigits}`;

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new student document
    const newStudent = new Student({
      studentId,
      firstName,
      middleName,
      lastName,
      email,
      password: hashedPassword,
      department,
      gender,
      phoneNumber,
      agreement: agreement === 'true', // Convert string to boolean
      certificate,
      role: 'student'
    });

    await newStudent.save();

    // Respond with success
    res.status(201).json({
      message: 'Student registered successfully',
      studentId,
      role: 'student'
    });
  } catch (err) {
    if (err.code === 11000) {
      res.status(400).json({ message: 'A user with that email already exists' });
    } else {
      console.error('Error registering this student:', err);
      res.status(500).json({ message: 'Error registering this student', error: err.message });
    }
  }
};
