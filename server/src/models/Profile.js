const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  address: {
    street: String,
    city: { type: String, required: true },
    state: String,
    zipCode: String,
    coordinates: {
      lat: Number,
      lng: Number
    }
  },
  profileImage: {
    type: String,
    default: ''
  },
  
  // Donor specific fields
  bloodGroup: {
    type: String,
    enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
    required: function() { return this.user?.role === 'donor'; }
  },
  age: {
    type: Number,
    min: 18,
    max: 65
  },
  gender: {
    type: String,
    enum: ['male', 'female', 'other']
  },
  weight: Number,
  lastDonationDate: Date,
  isEligible: {
    type: Boolean,
    default: true
  },
  isAvailable: {
    type: Boolean,
    default: true
  },
  medicalConditions: [String],
  
  // Hospital/Blood Bank specific fields
  organizationName: String,
  licenseNumber: String,
  organizationType: {
    type: String,
    enum: ['hospital', 'bloodbank', 'ngo']
  },
  capacity: Number,
  servicesOffered: [String]
}, {
  timestamps: true
});

// Calculate donation eligibility (90 days cooldown)
profileSchema.methods.canDonate = function() {
  if (!this.lastDonationDate) return true;
  const daysSinceLastDonation = (Date.now() - this.lastDonationDate) / (1000 * 60 * 60 * 24);
  return daysSinceLastDonation >= 90;
};

module.exports = mongoose.model('Profile', profileSchema);