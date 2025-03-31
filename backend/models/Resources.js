const mongoose = require("mongoose");

const resourceSchema = new mongoose.Schema({
  teacherId: { type: String, required: true },
  courseId: { type: String, required: true },
  courseName: { type: String, required: true },
  fileUrl: { type: String, required: true },
  fileType: { type: String, required: true }, // e.g., "video" or "book"
  uploadDate: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Resource", resourceSchema);
