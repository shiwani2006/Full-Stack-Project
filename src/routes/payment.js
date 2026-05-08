const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');
const { protect } = require('../middleware/authMiddleware');

router.post('/create-order', protect, paymentController.createOrder);
router.post('/verify', protect, paymentController.verifyAndStore);
router.post('/refund', protect, paymentController.refund);
router.post('/webhook', paymentController.webhook); // no auth — Razorpay calls this
module.exports = router;