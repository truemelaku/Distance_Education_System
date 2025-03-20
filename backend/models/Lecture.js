const mongoose = require("mongoose");

const lectureSchema = new mongoose.Schema({
  teacherId: { type: String, required: true },
  courseId: { type: String, required: true },
  courseName: { type: String },
  departmentName: { type: String },
  instructor: { type: String },
  teacherIdInstructor: { type: String, required: true },
  date: { type: Date },
  semester: { type: String },
  creditHour: { type: String },
  status: { type: String, default: "Scheduled" },
});

module.exports = mongoose.model("Lecture", lectureSchema);