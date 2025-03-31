const Resource = require("../models/Resources");

exports.uploadResource = async (req, res) => {
  try {
    const { courseId, courseName, fileType } = req.body;

    if (!req.file) return res.status(400).json({ error: "File is required" });

    const newResource = new Resource({
      teacherId: req.user.teacherId,
      courseId,
      courseName,
      fileType,
      fileUrl: `/uploads/${req.file.filename}`,
    });

    await newResource.save();
    res.status(201).json(newResource);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getResources = async (req, res) => {
  try {
    const resources = await Resource.find({ teacherId: req.user.teacherId });
    res.json(resources);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
