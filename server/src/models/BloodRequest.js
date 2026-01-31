const mongoose = require('mongoose');

const bloodRequestSchema = new mongoose.Schema({
  requester: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  bloodGroup: {
    type: String,
    enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
    required: true
  },
  unitsNeeded: {
    type: Number,
    required: true,
    min: 1
  },
  urgency: {
    type: String,
    enum: ['normal', 'urgent', 'emergency'],
    default: 'normal'
  },
  patientName: {
    type: String,
    required: true
  },
  patientAge: Number,
  medicalCondition: String,
  hospitalName: {
    type: String,
    required: true
  },
  contactPerson: {
    name: String,
    phone: String
  },
  location: {
    address: String,
    city: { type: String, required: true },
    coordinates: {
      lat: Number,
      lng: Number
    }
  },
  requiredBy: {
    type: Date,
    required: true
  },
  status: {
    type: String,
    enum: ['active', 'fulfilled', 'expired', 'cancelled'],
    default: 'active'
  },
  responses: [{
    donor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    status: {
      type: String,
      enum: ['interested', 'accepted', 'denied', 'completed', 'cancelled'],
      default: 'interested'
    },
    respondedAt: {
      type: Date,
      default: Date.now
    },
    acceptedAt: Date,
    deniedAt: Date
  }],
  notes: String
}, {
  timestamps: true
});

// Auto-expire requests after required date
bloodRequestSchema.methods.checkExpiry = function() {
  if (this.requiredBy < new Date() && this.status === 'active') {
    this.status = 'expired';
    return this.save();
  }
};

module.exports = mongoose.model('BloodRequest', bloodRequestSchema);