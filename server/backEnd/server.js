const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');
const connectDB = require('../dataBase/config/dbConnect');
const initAdminUser = require('../dataBase/init/initAdminUser');
const apiRoutes = require('./routes');

// Load env vars
dotenv.config();

// Connect to database
connectDB()
  .then(async () => {
    // Initialize admin user after DB connection
    await initAdminUser();
  })
  .catch(err => {
    console.error('Failed to initialize app:', err);
    process.exit(1);
  });

// Initialize app
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// CORS configuration - Allow all origins during development
app.use(cors({
  origin: '*',  // Allow all origins
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// API Routes
app.use('/api', apiRoutes);

// Route for testing connection
app.get('/test', (req, res) => {
  res.json({ message: 'Server is running correctly!' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : 'Server error'
  });
});

// Define PORT
const PORT = process.env.PORT || 5000;

// Start server
app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.log(`Error: ${err.message}`);
  // Close server & exit process
  process.exit(1);
}); 