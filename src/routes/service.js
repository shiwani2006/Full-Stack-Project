const express = require('express');
const router = express.Router();
const { createService, getAllServices, getServiceById } = require('../controllers/serviceController');
const { protect } = require('../middleware/authMiddleware');
const { getRecommendations } = require('../services/mlService');

router.post('/', protect, createService);      // login required
router.get('/', getAllServices);               // public
router.get('/:id', getServiceById);           // public

module.exports = router;
router.post('/recommend', protect, async (req, res) => {
  try {
    const { description, preferredPayment } = req.body;
    const userId = req.user.userId;

    const recommendations = await getRecommendations({
      userId,
      description,
      preferredPayment
    });

    res.json({ recommendations });
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong' });
  }
});