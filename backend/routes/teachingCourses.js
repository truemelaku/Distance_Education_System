const express = require("express");
const router = express.Router();
const multer = require("multer");
const { Course, Teacher, Upload } = require("../models");

// Middleware for file upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage: storage });

// Fetch teacher's courses
router.get("/courses", async (req, res) => {
  try {
    const teacherId = req.user._id; // Assuming you have teacher's ID in the user object
    const courses = await Course.find({ teacherId });
    res.json(courses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Upload book/video
router.post("/upload", upload.single("file"), async (req, res) => {
  try {
    const { courseId, title, type } = req.body;
    const filePath = req.file.path;

    const newUpload = new Upload({
      courseId,
      title,
      type,
      filePath,
    });

    await newUpload.save();
    res.json(newUpload);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;