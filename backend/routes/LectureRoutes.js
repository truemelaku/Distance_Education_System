const express = require("express");
const { createLecture, getAllLectures, getLectureById, updateLecture, deleteLecture } = require("../controllers/lectureController");

const router = express.Router();

router.post("/", createLecture);
router.get("/", getAllLectures);
router.get("/:id", getLectureById);
router.put("/:id", updateLecture);
router.delete("/:id", deleteLecture);

module.exports = router;
