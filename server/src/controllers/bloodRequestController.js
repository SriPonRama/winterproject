const BloodRequest = require('../models/BloodRequest');
const Profile = require('../models/Profile');

const bloodRequestController = {
  // Create new blood request
  createRequest: async (req, res) => {
    try {
      const requestData = {
        ...req.body,
        requester: req.user._id
      };

      const bloodRequest = new BloodRequest(requestData);
      await bloodRequest.save();

      res.status(201).json({
        message: 'Blood request created successfully',
        request: bloodRequest
      });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  },

  // Get all blood requests with filters
  getRequests: async (req, res) => {
    try {
      const { bloodGroup, city, urgency, status = 'active' } = req.query;
      
      let filter = { status };
      
      if (bloodGroup) filter.bloodGroup = bloodGroup;
      if (city) filter['location.city'] = new RegExp(city, 'i');
      if (urgency) filter.urgency = urgency;

      const requests = await BloodRequest.find(filter)
        .populate('requester', 'email role')
        .sort({ urgency: -1, createdAt: -1 })
        .limit(50);

      res.json(requests);
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  },

  // Get emergency requests
  getEmergencyRequests: async (req, res) => {
    try {
      const emergencyRequests = await BloodRequest.find({
        urgency: 'emergency',
        status: 'active'
      })
      .populate('requester', 'email')
      .sort({ createdAt: -1 })
      .limit(10);

      res.json(emergencyRequests);
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  },

  // Respond to blood request
  respondToRequest: async (req, res) => {
    try {
      const { requestId } = req.params;
      const { status } = req.body;

      const bloodRequest = await BloodRequest.findById(requestId);
      if (!bloodRequest) {
        return res.status(404).json({ message: 'Blood request not found' });
      }

      // Check if donor already responded
      const existingResponse = bloodRequest.responses.find(
        r => r.donor.toString() === req.user._id.toString()
      );

      if (existingResponse) {
        existingResponse.status = status;
      } else {
        bloodRequest.responses.push({
          donor: req.user._id,
          status
        });
      }

      await bloodRequest.save();

      res.json({
        message: 'Response recorded successfully',
        request: bloodRequest
      });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  },

  // Get user's requests with donor details (for hospitals/blood banks)
  getMyRequests: async (req, res) => {
    try {
      const requests = await BloodRequest.find({ requester: req.user._id })
        .populate('responses.donor', 'email role')
        .sort({ createdAt: -1 });

      // Get donor profiles for each response
      for (let request of requests) {
        for (let response of request.responses) {
          if (response.donor) {
            const profile = await Profile.findOne({ user: response.donor._id });
            response.donor.profile = profile;
          }
        }
      }

      res.json(requests);
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  },

  // Accept or deny donor response (blood banks only)
  manageDonorResponse: async (req, res) => {
    try {
      const { requestId, donorId } = req.params;
      const { action } = req.body; // 'accept' or 'deny'

      console.log('manageDonorResponse called:', { requestId, donorId, action, userId: req.user._id });

      const bloodRequest = await BloodRequest.findById(requestId);
      if (!bloodRequest) {
        console.log('Blood request not found:', requestId);
        return res.status(404).json({ message: 'Blood request not found' });
      }

      // Check if user owns this request
      if (bloodRequest.requester.toString() !== req.user._id.toString()) {
        console.log('Authorization failed:', { requester: bloodRequest.requester, user: req.user._id });
        return res.status(403).json({ message: 'Not authorized to manage this request' });
      }

      // Find the donor response
      const donorResponse = bloodRequest.responses.find(
        r => r.donor.toString() === donorId
      );

      if (!donorResponse) {
        console.log('Donor response not found:', { donorId, responses: bloodRequest.responses });
        return res.status(404).json({ message: 'Donor response not found' });
      }

      // Update response status
      if (action === 'accept') {
        donorResponse.status = 'accepted';
        donorResponse.acceptedAt = new Date();
      } else if (action === 'deny') {
        donorResponse.status = 'denied';
        donorResponse.deniedAt = new Date();
      }

      await bloodRequest.save();
      console.log('Response updated successfully:', { action, donorId });

      res.json({
        message: `Donor response ${action}ed successfully`,
        request: bloodRequest
      });
    } catch (error) {
      console.error('manageDonorResponse error:', error);
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  },

  // Update request status (hospitals/blood banks only)
  updateStatus: async (req, res) => {
    try {
      const { requestId } = req.params;
      const { status } = req.body;

      const bloodRequest = await BloodRequest.findById(requestId);
      if (!bloodRequest) {
        return res.status(404).json({ message: 'Blood request not found' });
      }

      // Check if user owns this request
      if (bloodRequest.requester.toString() !== req.user._id.toString()) {
        return res.status(403).json({ message: 'Not authorized to update this request' });
      }

      bloodRequest.status = status;
      await bloodRequest.save();

      res.json({
        message: 'Request status updated successfully',
        request: bloodRequest
      });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  }
};

module.exports = bloodRequestController;