const express = require('express');
const router = express.Router();
const userRoutes = require('./userRoutes');

// User routes
router.use('/users', userRoutes);

// Other routes will be added here as the application grows

module.exports = router; 