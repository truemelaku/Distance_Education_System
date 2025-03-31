const express = require("express");
const router = express.Router();
const Lecture = require("../models/Lecture");
const jwt = require('jsonwebtoken');
require('dotenv').config();
const jwtSecret = process.env.JWT_SECRET;  // Secret key for JWT

// Middleware to authenticate the teacher
// const authenticateTeacher = (req, res, next) => {
//   const token = req.header("Authorization");
//   if (!token) {
//     return res.status(401).json({ message: "Unauthorized: Token missing" });
//   }
  
//   try {
//     // Verify the token and decode it
//     const decoded = jwt.verify(token, jwtSecret);
//     req.teacherId = decoded.teacherId; // Extract teacherId from the token
//     next();
//   } catch (err) {
//     return res.status(401).json({ message: "Unauthorized: Invalid token" });
//   }
// };

// Route to fetch allocated courses for the logged-in teacher
// Fetch lectures for a specific teacher
exports.getTeacherLectures = async (req, res) => {
  const teacherId = req.params.teacherId;

  try {
    const lectures = await Lecture.find({ teacherId });
    res.json(lectures);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = router;
