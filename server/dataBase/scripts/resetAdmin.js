require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../models/userModel');
const connectDB = require('../config/dbConnect');

const resetAdmin = async () => {
  try {
    // Connect to MongoDB
    await connectDB();
    
    // Check if admin exists
    const adminUser = await User.findOne({ email: 'admin@key2rent.com' });
    
    if (adminUser) {
      console.log('Found existing admin user:', {
        id: adminUser._id,
        email: adminUser.email,
        role: adminUser.role
      });
      
      // Delete the existing admin
      await User.findByIdAndDelete(adminUser._id);
      console.log('Deleted existing admin user');
    } else {
      console.log('No admin user found');
    }
    
    // Create new admin user with correct credentials
    const newAdmin = await User.create({
      fullName: 'Admin User',
      email: 'admin@key2rent.com',
      password: 'admin@k2r',
      role: 'admin'
    });
    
    console.log('Created new admin user:', {
      id: newAdmin._id,
      email: newAdmin.email,
      role: newAdmin.role
    });
    
    // Check for any property-manager accounts
    const propertyManagers = await User.find({ role: 'property-manager' });
    if (propertyManagers.length > 0) {
      console.log(`Found ${propertyManagers.length} property manager accounts`);
      
      // Delete property manager accounts
      await User.deleteMany({ role: 'property-manager' });
      console.log('Deleted all property manager accounts');
    }
    
    console.log('Admin reset completed successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error resetting admin:', error);
    process.exit(1);
  }
};

// Execute the function
resetAdmin(); 