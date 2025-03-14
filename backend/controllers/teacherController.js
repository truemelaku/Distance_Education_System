
const Teacher = require('../models/Teacher');
const bcrypt = require('bcrypt');

// Register Teacher
exports.registerTeacher = async (req, res) => {
  const { fullName, email, gender, department, teacherId,teachingSubject, qualificationCertificate, password } = req.body;

  try {
    let teacher1 = await Teacher.findOne({ teacherId });
    if (teacher1) return res.status(400).json({ message: 'Teacher already registered.' });



    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create and save new teacher
    const teacher = new Teacher({
      fullName,
      email,
      teacherId,
      gender,
      department,
      teachingSubject,
      qualificationCertificate,
      password: hashedPassword,
      role: 'teacher',
    });

    await teacher.save();
    res.json({ message: 'Teacher registered successfully'});
  } catch (error) {
    console.error('Error registering teacher:', error);
    res.status(500).json({ message: 'Error registering teacher', error: error.message });
  }
};
//to view all teachers
exports.getAllTeachers = async (req, res) => {
  try {
    const teachers = await Teacher.find(); // Fetch all teachers from the database
    res.status(200).json(teachers);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch teachers' });
  }
};
//to delete
exports.deleteTeacher = async (req, res) => {
  try {
    const teacher = await Teacher.findByIdAndDelete(req.params.id); // Use `findByIdAndDelete`
    if (!teacher) {
      return res.status(404).json({ message: 'Teacher not found' });
    }
    res.json({ message: 'Teacher deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting teacher', error: error.message });
  }
};
exports.getTotalTeacherCount=async (req,res)=>{
  try {
    const totalTeachers = await Teacher.countDocuments();
    res.status(200).json({ totalTeachers });
}
   catch (error) {
    console.error("Error fetching student count:", error);
    res.status(500).json({ error: "Server error" });
  }
}