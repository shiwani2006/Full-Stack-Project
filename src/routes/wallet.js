const express = require('express');
const router = express.Router();
const walletController = require('../controllers/walletController');
const { protect } = require('../middleware/authMiddleware');
const walletService = require('../services/walletService');

router.get('/balance/:userId', protect, walletController.getBalance);
router.post('/add-cash', protect, walletController.addCash);
router.post('/add-credits', protect, walletController.addCredits);
router.post('/pay', protect, walletController.hybridPay);
router.get('/', protect, async (req, res) => {
  try {
    const userId = req.user.userId;
    const balance = await walletService.getBalance(userId);
    res.json(balance);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// GET /api/wallet/transactions — credit transaction history
router.get('/transactions', protect, async (req, res) => {
  try {
    const userId = req.user.userId;
    const { PrismaClient } = require('@prisma/client');
    const prisma = new PrismaClient();

    const transactions = await prisma.creditLedger.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' }
    });

    res.json({ transactions });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
module.exports = router;
