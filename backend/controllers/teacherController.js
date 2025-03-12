const { generateToken } = require('../utils/jwt');
const Teacher = require('../models/Teacher');
const bcrypt = require('bcrypt');

// Register Teacher
exports.registerTeacher = async (req, res) => {
  const { fullName, email, gender, department, teachingSubject, qualificationCertificate, password } = req.body;

  try {
    const existingTeacher = await Teacher.findOne({ email });
    if (existingTeacher) return res.status(400).json({ message: 'Teacher already registered.' });

    // Generate unique teacher ID
    const randomDigits = Math.floor(1000 + Math.random() * 9000);
    const teacherId = `teach${randomDigits}`;

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create and save new teacher
    const teacher = new Teacher({
      fullName,
      email,
      teacherId,
      gender,
      department,
      teachingSubject,
      qualificationCertificate,
      password: hashedPassword,
      role: 'teacher',
    });

    await teacher.save();

    // Generate JWT token for the teacher
    const token = generateToken(teacher);

    res.status(201).json({ message: 'Teacher registered successfully', teacherId, token });
  } catch (error) {
    res.status(500).json({ message: 'Error registering teacher', error: error.message });
  }
};
