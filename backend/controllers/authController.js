const Student = require('../models/Student');
const Teacher = require('../models/Teacher');
const Admin = require('../models/Admin');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const generateToken = require('../utils/jwt'); // Assuming this helper works

exports.loginUser = async (req, res) => {
    const { username, password } = req.body;

    try {
        let user = null;

        // Check in Student, Teacher, or Admin collections based on the username
        user = await Student.findOne({ studentId: username }) || 
               await Teacher.findOne({ teacherId: username }) || 
               await Admin.findOne({ adminId: username });

        // If user not found in any collection
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Compare provided password with hashed password in the database
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Generate JWT token using the helper function
        const token = generateToken(user);

        // Send token and user role in the response
        return res.json({ token, role: user.role });

    } catch (err) {
        console.error('Server error:', err);
        return res.status(500).json({ message: 'Server error' });
    }
};
