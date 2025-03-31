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

// Controller function to get total student count
exports.getTotalStudentCount = async (req, res) => {
  try {
    
    const totalStudents = await Student.countDocuments();
    res.json({ totalStudents });
  } catch (error) {
    console.error("Error fetching student count:", error);
    res.status(500).json({ error: "Server error" });
  }
};

// Delete Student by ID
exports.deleteStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const student = await Student.findByIdAndDelete(id);
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }
    res.status(200).json({ message: "Student deleted successfully" });
  } catch (error) {
    console.error("Error deleting student:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Update Student by ID (MongoDB _id)
exports.updateStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      firstName,
      middleName,
      lastName,
      email,
      phoneNumber,
      department,
      gender,
    } = req.body;

    // Try to update the student details
    const student = await Student.findByIdAndUpdate(
      id,
      {
        studentId,
        firstName,
        middleName,
        lastName,
        email,
        phoneNumber,
        department,
        gender,
      },
      { new: true } // The new option ensures we get the updated student
    );

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.status(200).json(student); // Return the updated student data
  } catch (error) {
    console.error("Error updating student:", error);
    res.status(500).json({ message: "Server error" });
  }
};
exports.studentProfile=async (req, res) => {
  try {
    const student = await Student.findById(req.user.id); // Find the user in your database
    if (!student) return res.status(404).json({ message: 'Student not found' });

    res.json({
      studentId: student.studentId,
      email: student.email,
      firstName: student.firstName,
      middleName: student.middleName,
      lastName: student.lastName,
      department: student.department,
      gender: student.gender,
     phoneNumber:student.phoneNumber,
    });
    
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user profile' });
  }
};