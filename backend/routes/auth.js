const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const User = require("../models/User");

const router = express.Router();

// Set up multer for file upload (you can store files in a 'uploads' directory)
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Directory where files will be stored
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname); // Save files with a timestamp
  }
});
const upload = multer({ storage });

// Registration route
router.post("/register", upload.single("entranceExamCertificate"), async (req, res) => {
  const { fullname, gender, email, password, confirmPassword, department } = req.body;

  // Check if passwords match
  if (password !== confirmPassword) {
    return res.status(400).json({ message: "Passwords do not match" });
  }

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists go to login page" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({
      fullname,
      gender,
      email,
      password: hashedPassword,
      department,
      entranceExamCertificate: req.file.path, // Store the file path
    });

    // Save the user to the database
    await newUser.save();
    res.status(201).json({ message: "User registered successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// Login route
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "user not register" });
    }
// Compare the password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Generate a token (JWT example)
    const token = jwt.sign({ userId: user._id }, "your_jwt_secret", {
      expiresIn: "1h",
    });

  res.status(200).json({ message: "Login successful", token });
    console.log("login succeful")
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
