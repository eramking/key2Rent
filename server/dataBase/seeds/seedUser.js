require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../models/userModel');
const connectDB = require('../config/dbConnect');

// Array of users to seed
const users = [
  {
    fullName: 'Admin User',
    email: 'admin@key2rent.com',
    password: 'admin@k2r', // Using the requested admin password
    role: 'admin'
  },
  {
    fullName: 'Property Manager',
    email: 'manager@key2rent.com',
    password: 'manager123',
    role: 'property-manager'
  },
  {
    fullName: 'Regular User',
    email: 'user@key2rent.com',
    password: 'user123',
    role: 'user'
  }
];

// Seed function
const seedUsers = async () => {
  try {
    // Connect to the database
    await connectDB();
    
    // Delete existing users
    await User.deleteMany({
      email: { $in: users.map(user => user.email) }
    });
    console.log('Deleted existing test users');
    
    // Create new users
    const createdUsers = await User.create(users);
    console.log('Users seeded successfully:', createdUsers.map(user => ({
      fullName: user.fullName,
      email: user.email,
      role: user.role
    })));
    
    console.log('Seeding completed successfully');
    process.exit();
  } catch (error) {
    console.error('Error seeding users:', error);
    process.exit(1);
  }
};

// Run the seed function
seedUsers(); 