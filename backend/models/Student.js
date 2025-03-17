const mongoose = require('mongoose');
const studentSchema = new mongoose.Schema({
  studentId: { type: String, required: true, unique: true }, // Unique student ID
  firstName: { type: String, required: true }, 
  middleName: { type: String, required: true }, 
  lastName: { type: String, required: true }, 
  email: { type: String, required: true, unique: true }, 
  password: { type: String, required: true }, 
  phoneNumber: { type: String, required: true }, 
  department: { type: String, required: true },  
  role: { type: String, default: 'student' }, 
  gender: { type: String, enum: ['male', 'female', 'other'], required: true }, 
  agreement: { type: Boolean, required: true }, 
  certificate: { type: String }, 
}, {
  timestamps: true // Adds createdAt and updatedAt timestamps
});

module.exports = mongoose.model('Student', studentSchema);
