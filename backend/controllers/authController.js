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
        // user = await Student.findOne({ studentId: username }) || 
        //        await Teacher.findOne({ teacherId: username }) || 
        //        await Admin.findOne({ adminId: username });

        // Check in Students
         user = await Student.findOne({ studentId: username });

        // If not found in Students, check in Teachers
        if (!user) {
            user = await Teacher.findOne({ teacherId: username });
        }

        // If not found in Teachers, check in Admins
        if (!user) {
            user = await Admin.findOne({ adminId: username });
        }


        // If user not found in any collection
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }


        // Compare provided password with hashed password in the database

        // Compare password

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Generate JWT
        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

        // Send token and role for redirection
        res.status(200).json({ token, role: user.role });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};
