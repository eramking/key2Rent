const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { protect, restrictTo } = require('../middleware/authMiddleware');

// Public routes
router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);

// Protected routes
router.get('/profile', protect, userController.getUserProfile);

// Admin routes
router.get('/admin/verify', protect, restrictTo('admin'), userController.verifyAdminAccess);

module.exports = router; 