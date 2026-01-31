const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const User = require('../models/User');
const Profile = require('../models/Profile');

const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '7d' });
};

const authController = {
  // Register new user
  register: async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { email, password, role, name, phone, city } = req.body;

      // Check if user exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
      }

      // Create user
      const user = new User({ email, password, role });
      await user.save();

      // Create profile
      const profile = new Profile({
        user: user._id,
        name,
        phone,
        address: { city }
      });
      await profile.save();

      const token = generateToken(user._id);

      res.status(201).json({
        message: 'User registered successfully',
        token,
        user: {
          id: user._id,
          email: user.email,
          role: user.role
        }
      });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  },

  // Login user
  login: async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { email, password } = req.body;

      // Find user and profile
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }

      // Check password
      const isMatch = await user.comparePassword(password);
      if (!isMatch) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }

      // Get profile for user name
      const profile = await Profile.findOne({ user: user._id });
      const token = generateToken(user._id);

      res.json({
        message: 'Login successful',
        token,
        user: {
          id: user._id,
          email: user.email,
          role: user.role,
          name: profile?.name || user.email.split('@')[0]
        }
      });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  },

  // Get current user
  getMe: async (req, res) => {
    try {
      const profile = await Profile.findOne({ user: req.user._id });
      res.json({
        user: {
          id: req.user._id,
          email: req.user.email,
          role: req.user.role,
          name: profile?.name || req.user.email.split('@')[0]
        },
        profile: profile || {}
      });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  },

  // Update user profile
  updateProfile: async (req, res) => {
    try {
      const { name, phone, city, bloodGroup, age, weight } = req.body;
      
      let profile = await Profile.findOne({ user: req.user._id });
      
      if (!profile) {
        profile = new Profile({
          user: req.user._id,
          name,
          phone,
          address: { city },
          bloodGroup,
          age,
          weight
        });
      } else {
        profile.name = name;
        profile.phone = phone;
        profile.address.city = city;
        if (bloodGroup) profile.bloodGroup = bloodGroup;
        if (age) profile.age = age;
        if (weight) profile.weight = weight;
      }
      
      await profile.save();
      
      res.json({
        message: 'Profile updated successfully',
        profile
      });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  },

  // Get all donors (for hospitals/blood banks)
  getAllDonors: async (req, res) => {
    try {
      const donors = await User.find({ role: 'donor' })
        .select('email createdAt')
        .sort({ createdAt: -1 });

      // Get profiles for each donor
      const donorsWithProfiles = [];
      for (let donor of donors) {
        const profile = await Profile.findOne({ user: donor._id });
        if (profile) {
          donorsWithProfiles.push({
            id: donor._id,
            email: donor.email,
            name: profile.name,
            phone: profile.phone,
            bloodGroup: profile.bloodGroup,
            city: profile.address?.city,
            age: profile.age,
            weight: profile.weight,
            isAvailable: profile.isAvailable,
            joinedDate: donor.createdAt
          });
        }
      }

      res.json(donorsWithProfiles);
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  }
};

module.exports = authController;