const Teacher = require('../models/Teacher');

exports.createTeacher = async (teacherData) => {
  try {
    const newTeacher = new Teacher(teacherData);
    return await newTeacher.save();
  } catch (error) {
    throw new Error('Error creating teacher: ' + error.message);
  }
};

exports.getTeachers = async () => {
  try {
    return await Teacher.find();
  } catch (error) {
    throw new Error('Error fetching teachers: ' + error.message);
  }
};

exports.getTeacherById = async (id) => {
  try {
    return await Teacher.findById(id);
  } catch (error) {
    throw new Error('Error fetching teacher: ' + error.message);
  }
};

exports.updateTeacher = async (id, teacherData) => {
  try {
    return await Teacher.findByIdAndUpdate(id, teacherData, { new: true });
  } catch (error) {
    throw new Error('Error updating teacher: ' + error.message);
  }
};

exports.deleteTeacher = async (id) => {
  try {
    return await Teacher.findByIdAndDelete(id);
  } catch (error) {
    throw new Error('Error deleting teacher: ' + error.message);
  }
};
