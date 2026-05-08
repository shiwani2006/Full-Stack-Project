const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const {
  createServiceRequest,
  getAllServiceRequests,
  getMyServiceRequests,
  cancelServiceRequest,
  createOffer,
  acceptOffer,
} = require('../controllers/serviceRequestController');

// USER routes
router.post('/', protect, createServiceRequest);               // post a request
router.get('/my', protect, getMyServiceRequests);              // user's own requests
router.patch('/:id/cancel', protect, cancelServiceRequest);    // cancel a request

// PROVIDER routes
router.get('/', protect, getAllServiceRequests);                // browse open requests
router.post('/:serviceRequestId/offers', protect, createOffer); // submit offer

// USER: accept an offer
router.patch('/offers/:offerId/accept', protect, acceptOffer);

module.exports = router;
