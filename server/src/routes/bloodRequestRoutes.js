const express = require('express');
const bloodRequestController = require('../controllers/bloodRequestController');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

const router = express.Router();

// Create blood request (hospitals/blood banks only)
router.post('/', 
  authMiddleware, 
  roleMiddleware(['hospital', 'bloodbank']), 
  bloodRequestController.createRequest
);

// Get all blood requests
router.get('/', bloodRequestController.getRequests);

// Get emergency requests
router.get('/emergency', bloodRequestController.getEmergencyRequests);

// Get user's requests
router.get('/my-requests', authMiddleware, bloodRequestController.getMyRequests);

// Accept or deny donor response (blood banks only)
router.post('/:requestId/donor/:donorId/manage', 
  authMiddleware, 
  roleMiddleware(['hospital', 'bloodbank']), 
  bloodRequestController.manageDonorResponse
);

// Respond to blood request (donors only)
router.post('/:requestId/respond', 
  authMiddleware, 
  roleMiddleware(['donor']), 
  bloodRequestController.respondToRequest
);

// Update request status (hospitals/blood banks only)
router.patch('/:requestId/status', 
  authMiddleware, 
  roleMiddleware(['hospital', 'bloodbank']), 
  bloodRequestController.updateStatus
);

module.exports = router;