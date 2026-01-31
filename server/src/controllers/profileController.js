const Profile = require('../models/Profile');

const profileController = {
  // Update profile
  updateProfile: async (req, res) => {
    try {
      const profileData = req.body;
      
      let profile = await Profile.findOne({ user: req.user._id });
      
      if (profile) {
        // Update existing profile
        Object.assign(profile, profileData);
        if (profileData.city) {
          profile.address = { ...profile.address, city: profileData.city };
        }
        await profile.save();
      } else {
        // Create new profile
        profile = new Profile({
          user: req.user._id,
          ...profileData,
          address: { city: profileData.city }
        });
        await profile.save();
      }

      res.json({
        message: 'Profile updated successfully',
        profile
      });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  }
};

module.exports = profileController;