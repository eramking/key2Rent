const User = require('../models/userModel');

/**
 * Initialize admin user if it doesn't exist
 * This function runs at server startup
 */
const initAdminUser = async () => {
  try {
    // Check if admin user already exists
    const adminExists = await User.findOne({ email: 'admin@key2rent.com' });
    
    if (!adminExists) {
      console.log('Admin user not found, creating admin user...');
      
      // Create admin user
      const admin = await User.create({
        fullName: 'Admin User',
        email: 'admin@key2rent.com',
        password: 'admin@k2r',
        role: 'admin'
      });
      
      console.log('Admin user created successfully:', {
        fullName: admin.fullName,
        email: admin.email,
        role: admin.role
      });
    } else {
      console.log('Admin user already exists');
    }
    
    // Clean up any property-manager accounts (we don't need them)
    const propertyManagerCount = await User.countDocuments({ role: 'property-manager' });
    if (propertyManagerCount > 0) {
      await User.deleteMany({ role: 'property-manager' });
      console.log(`Removed ${propertyManagerCount} property manager accounts`);
    }
  } catch (error) {
    console.error('Error initializing admin user:', error);
  }
};

module.exports = initAdminUser; 