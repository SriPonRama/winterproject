const mongoose = require('mongoose');

const donationSchema = new mongoose.Schema({
  donor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  recipient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  bloodRequest: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'BloodRequest',
    required: true
  },
  bloodGroup: {
    type: String,
    enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
    required: true
  },
  unitsCollected: {
    type: Number,
    required: true,
    min: 1
  },
  donationDate: {
    type: Date,
    default: Date.now
  },
  location: {
    hospitalName: String,
    address: String,
    city: String
  },
  status: {
    type: String,
    enum: ['scheduled', 'completed', 'cancelled'],
    default: 'scheduled'
  },
  healthCheckResults: {
    hemoglobin: Number,
    bloodPressure: String,
    weight: Number,
    temperature: Number,
    approved: {
      type: Boolean,
      default: false
    }
  },
  notes: String,
  certificateIssued: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Donation', donationSchema);