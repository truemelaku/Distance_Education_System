const express = require("express");
const mongoose = require("mongoose");
const userRoutes = require("./routes/auth");
const cors = require("cors");



const app = express();

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/distance_education_database", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});


app.use(cors())
//app.use(cors({ origin: '*' }));//accessible to all ports
// Middleware
app.use(express.json());
app.use("/uploads", express.static("uploads")); // Make the uploads directory publicly accessible

// Routes
app.use("/api/users", userRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
