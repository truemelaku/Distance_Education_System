const Lecture = require("../models/Lecture");
const Teacher = require("../models/Teacher");

// @desc  Create a new lecture and assign it to a teacher
// @route POST /api/lectures
// @access Public
exports.createLecture = async (req, res) => {
  try {
    const { teacherId, courseId, courseName, instructor, teacherIdInstructor, date, semester, creditHour, status } = req.body;

    // Log incoming request body for debugging
    console.log("Create Lecture Request Body:", req.body);

    // Find the teacher by teacherIdInstructor (readable ID)
    const teacher = await Teacher.findOne({ teacherId: teacherIdInstructor });
    if (!teacher) {
      return res.status(404).json({ message: "Teacher not found for teacherIdInstructor" });
    }

    // Validate teacherId exists in Teacher collection
    const teacherForId = await Teacher.findOne({ teacherId });
    if (!teacherForId) {
      return res.status(404).json({ message: "Teacher ID not found" });
    }

    // Create the lecture
    const newLecture = new Lecture({
      teacherId,
      courseId,
      courseName,
      departmentName: teacher.department,
      instructor,
      teacherIdInstructor: teacher.teacherId,
      date,
      semester,
      creditHour,
      status: status || "Scheduled",
    });

    await newLecture.save();
    console.log("Lecture Saved:", newLecture); // Log success
    return res.status(201).json(newLecture);
  } catch (error) {
    console.error("Create Lecture Error:", error.message, error.stack);
    if (!res.headersSent) {
      return res.status(500).json({ error: error.message, stack: error.stack });
    }
  }
};

// @desc  Get all lectures with teacher details
// @route GET /api/lectures
// @access Public
exports.getAllLectures = async (req, res) => {
  try {
    // Removed .populate() since teacherIdInstructor is a string, not a reference
    const lectures = await Lecture.find();
    console.log("Fetched Lectures:", lectures); // Log success
    return res.json(lectures);
  } catch (error) {
    console.error("Get All Lectures Error:", error.message, error.stack);
    if (!res.headersSent) {
      return res.status(500).json({ error: error.message, stack: error.stack });
    }
  }
};

// @desc  Get a lecture by ID
// @route GET /api/lectures/:id
// @access Public
exports.getLectureById = async (req, res) => {
  try {
    const lecture = await Lecture.findById(req.params.id);
    if (!lecture) {
      return res.status(404).json({ message: "Lecture not found" });
    }
    console.log("Fetched Lecture by ID:", lecture); // Log success
    return res.json(lecture);
  } catch (error) {
    console.error("Get Lecture by ID Error:", error.message, error.stack);
    if (!res.headersSent) {
      return res.status(500).json({ error: error.message, stack: error.stack });
    }
  }
};

// @desc  Update a lecture
// @route PUT /api/lectures/:id
// @access Public
exports.updateLecture = async (req, res) => {
  try {
    const { teacherId, courseId, courseName, instructor, teacherIdInstructor, date, semester, creditHour, status } = req.body;

    console.log("Update Lecture Request Body:", req.body); // Log incoming data

    // Validate teacherIdInstructor if provided
    if (teacherIdInstructor) {
      const teacher = await Teacher.findOne({ teacherId: teacherIdInstructor });
      if (!teacher) {
        return res.status(404).json({ message: "Teacher not found for teacherIdInstructor" });
      }
    }

    // Validate teacherId if provided
    if (teacherId) {
      const teacherForId = await Teacher.findOne({ teacherId });
      if (!teacherForId) {
        return res.status(404).json({ message: "Teacher ID not found" });
      }
    }

    const updatedLecture = await Lecture.findByIdAndUpdate(
      req.params.id,
      { teacherId, courseId, courseName, instructor, teacherIdInstructor, date, semester, creditHour, status },
      { new: true }
    );

    if (!updatedLecture) {
      return res.status(404).json({ message: "Lecture not found" });
    }

    console.log("Lecture Updated:", updatedLecture); // Log success
    return res.json(updatedLecture);
  } catch (error) {
    console.error("Update Lecture Error:", error.message, error.stack);
    if (!res.headersSent) {
      return res.status(500).json({ error: error.message, stack: error.stack });
    }
  }
};

// @desc  Delete a lecture
// @route DELETE /api/lectures/:id
// @access Public
exports.deleteLecture = async (req, res) => {
  try {
    const deletedLecture = await Lecture.findByIdAndDelete(req.params.id);

    if (!deletedLecture) {
      return res.status(404).json({ message: "Lecture not found" });
    }

    console.log("Lecture Deleted:", deletedLecture); // Log success
    return res.json({ message: "Lecture deleted successfully" });
  } catch (error) {
    console.error("Delete Lecture Error:", error.message, error.stack);
    if (!res.headersSent) {
      return res.status(500).json({ error: error.message, stack: error.stack });
    }
  }
};