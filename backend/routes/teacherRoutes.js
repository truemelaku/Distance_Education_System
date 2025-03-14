const express = require('express');
const router = express.Router();
const TeacherController = require('../controllers/teacherController');
const adminAuth  = require('../middlewares/adminAuth'); // Import auth middleware
const teacherAuth = require('../middlewares/teacherAuth');
const multer = require('multer');
const { route } = require('./authRoutes');
//const requireRole = require('../middlewares/requireRole'); // Import role-based middleware

// Only authenticated users with the 'admin' role can access this route
router.post('/register', adminAuth , TeacherController.registerTeacher);
router.get('/', TeacherController.getAllTeachers);
router.delete('/:id',adminAuth, TeacherController.deleteTeacher);
router.get('/count',TeacherController.getTotalTeacherCount)
//to upload lecture
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage });

// Upload lecture route
router.post('/upload-lecture', teacherAuth, upload.single('lecture'), TeacherController.uploadLecture);

module.exports = router;