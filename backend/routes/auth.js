const express = require('express');
const multer = require('multer');
const path = require('path');
const Student = require('../models/Student');
const Admin = require('../models/Admin');
const bcrypt = require('bcrypt');
const router = express.Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// Helper function to send error response
const handleError = (res, message, statusCode = 400) => {
  return res.status(statusCode).json({ success: false, message });
};

// Register Student (with certificate upload)
router.post('/register-student', upload.single('certificate'), async (req, res) => {
  const { firstName, middleName, lastName, email, password, department, gender, phoneNumber, agreement } = req.body;
  const certificate = req.file ? req.file.path : null; // Uploaded file path

  // Check if required fields are provided
  if (!email || !password) {
    return handleError(res, 'Email and password are required.', 400);
  }

  try {
    // Check if the email already exists
    const existingStudent = await Student.findOne({ email });
    if (existingStudent) {
      return handleError(res, 'This email is already registered. Please use a different email.', 409);
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

    // Send a success response to the browser
    res.status(201).json({
      success: true,
      message: 'Student registered successfully.',
      studentId,
      role: 'student',
    });
  } catch (err) {
    console.error('Error registering the student:', err);
    if (err.code === 11000) {
      return handleError(res, 'A student with that email already exists.', 409);
    } else {
      return handleError(res, 'There was an issue registering the student. Please try again later.', 500);
    }
  }
});

// Register Admin (Manually adding an admin)
router.post('/register-admin', async (req, res) => {
  const { name, email, password } = req.body;

  // Check if required fields are provided
  if (!email || !password) {
    return handleError(res, 'Email and password are required.', 400);
  }

  try {
    // Generate a unique admin ID
    const randomDigits = Math.floor(1000 + Math.random() * 9000);
    const adminId = `admin${randomDigits}`;

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new admin document
    const newAdmin = new Admin({
      adminId,
      name,
      email,
      password: hashedPassword,
      role: 'admin',
    });

    await newAdmin.save();

    // Send a success response to the browser
    res.status(201).json({
      success: true,
      message: 'Admin registered successfully.',
      adminId,
    });
  } catch (err) {
    console.error('Error registering the admin:', err);
    return handleError(res, 'There was an issue registering the admin. Please try again later.', 500);
  }
});

// Login route for both students and admins
router.post('/login', async (req, res) => {
  const { studentId, password } = req.body;

  // Check if required fields are provided
  if (!studentId || !password) {
    return handleError(res, 'Student/Admin ID and password are required.', 400);
  }

  try {
    // Check if the user is a student
    let user = await Student.findOne({ studentId });

    // If not a student, check if the user is an admin
    if (!user) {
      user = await Admin.findOne({ adminId: studentId });
    }

    // If no user found, return error
    if (!user) {
      return handleError(res, 'No account found with the provided ID.', 404);
    }

    // Compare passwords
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return handleError(res, 'Incorrect password. Please try again.', 401);
    }

    // Send success response to the browser with redirection info
    const redirectUrl = user.role === 'student' ? '/student' : '/admin';
    return res.status(200).json({
      success: true,
      message: 'Login successful.',
      redirectTo: redirectUrl,
      role: user.role
    });
  } catch (err) {
    console.error('Error logging in:', err);
    return handleError(res, 'An error occurred during login. Please try again later.', 500);
  }
});

module.exports = router;
