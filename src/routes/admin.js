const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const { protect } = require('../middleware/authMiddleware');
const prisma = new PrismaClient();

// GET /api/admin/stats
router.get('/stats', protect, async (req, res) => {
  try {
    const [totalUsers, totalServices, totalBookings, totalPayments] = await Promise.all([
      prisma.user.count(),
      prisma.service.count(),
      prisma.booking.count(),
      prisma.payment.aggregate({ _sum: { amount: true } })
    ]);

    const bookingsByStatus = await prisma.booking.groupBy({
      by: ['status'],
      _count: { status: true }
    });

    res.json({
      totalUsers,
      totalServices,
      totalBookings,
      totalRevenue: totalPayments._sum.amount || 0,
      bookingsByStatus
    });
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong' });
  }
});

module.exports = router;
