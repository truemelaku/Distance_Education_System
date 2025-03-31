const bcrypt = require('bcryptjs');
const Admin = require('../models/Admin');

// Register a new admin (only accessible by super admin or admin)
exports.registerAdmin = async (req, res) => {
    const { adminId, name, email, password } = req.body;

    try {
        // Check if the admin already exists
        let admin = await Admin.findOne({ email });
        if (admin) {
            return res.status(400).json({ message: 'Admin already exists' });
        }

        // Create a new admin instance
        admin = new Admin({
            adminId,
            name,
            email,
            password,
            role: 'admin' // By default, the role is 'admin'
        });

        // Hash the password before saving the admin
        const salt = await bcrypt.genSalt(10);
        admin.password = await bcrypt.hash(password, salt);

        // Save the admin to the database
        await admin.save();

        res.status(201).json({ message: 'Admin registered successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.adminProfile=async (req, res) => {
    try {
      const admin = await Admin.findById(req.user.id); // Find the user in your database
      if (!admin) return res.status(404).json({ message: 'Admin not found' });
  
      res.json({
        adminId: admin.adminId,
        email: admin.email,
        name: admin.name,
       
      });
      
    } catch (error) {
      res.status(500).json({ message: 'Error fetching admin profile',err });
    }
  };
