const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  fullname: { type: String, required: true },
  gender: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  department: { type: String, required: true },
  entranceExamCertificate: { type: String, required: true }, // Store the path to the uploaded file
});

const User = mongoose.model("User", userSchema);

module.exports = User;