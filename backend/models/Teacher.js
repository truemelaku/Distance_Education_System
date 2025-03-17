const mongoose = require('mongoose');

const teacherSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  teacherId: { type: String, required: true, unique: true },
  gender: { type: String, required: true },
  department: { type: String, required: true },
  teachingSubject: { type: String, required: true },
  role: { type: String, default: 'teacher' }, 
  qualificationCertificate: { type: String, required: true },
  uploadedLectures: [{
    title: String,
    description: String,
    fileUrl: String,
    uploadedAt: {
      type: Date,
      default: Date.now,
    }
  }],
  password: { type: String, required: true },
  
}, { timestamps: true });

module.exports = mongoose.model('Teacher', teacherSchema);
