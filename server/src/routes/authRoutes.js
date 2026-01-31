const express = require('express');
const { body } = require('express-validator');
const authController = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Register
router.post('/register', [
  body('email').isEmail().normalizeEmail(),
  body('password').isLength({ min: 6 }),
  body('role').isIn(['donor', 'hospital', 'bloodbank']),
  body('name').notEmpty().trim(),
  body('phone').notEmpty().trim(),
  body('city').notEmpty().trim()
], authController.register);

// Login
router.post('/login', [
  body('email').isEmail().normalizeEmail(),
  body('password').notEmpty()
], authController.login);

// Get current user
router.get('/me', authMiddleware, authController.getMe);

// Update profile
router.put('/profile', authMiddleware, authController.updateProfile);

// Get all donors (hospitals/blood banks only)
router.get('/donors', 
  authMiddleware, 
  require('../middleware/roleMiddleware')(['hospital', 'bloodbank']), 
  authController.getAllDonors
);

module.exports = router;