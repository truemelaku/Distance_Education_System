const express = require("express");
const router = express.Router();
//const authMiddleware = require("../middleware/authMiddleware");
const upload = require("../middlewares/TeacherUpload");
const { uploadResource, getResources } = require("../controllers/ResourceController");

router.post("/upload", upload.single("file"), uploadResource);
router.get("/",  getResources);


module.exports = router;
