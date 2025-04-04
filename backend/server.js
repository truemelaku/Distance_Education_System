const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const cors=require('cors');
const path = require('path');
const authRoutes = require('./routes/authRoutes');
const studentRoutes = require('./routes/studentRoutes');
const teacherRoutes = require('./routes/teacherRoutes');
const LectureRoutes = require('./routes/LectureRoutes');
const adminRoutes = require('./routes/adminRoutes');
const resourceRoutes= require('./routes/ResourceRoutes')
const app = express();
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URl, { 
  //useNewUrlParser: true, useUnifiedTopology: true 
})
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log(err));

// Static Uploads Directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/auth', authRoutes);  // For login
app.use('/api/students', studentRoutes);
app.use('/api/lectures',LectureRoutes)
app.use('/api/teachers', teacherRoutes);
app.use('/api/admins', adminRoutes);
app.use("/api/resources", resourceRoutes);


// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
