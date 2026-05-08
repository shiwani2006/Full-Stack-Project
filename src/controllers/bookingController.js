const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { fraudCheck } = require('../services/mlService');

// CREATE A BOOKING
const createBooking = async (req, res) => {
  try {
    const { serviceId, paymentMethod, creditAmount, cashAmount, scheduledAt } = req.body;
    const requesterId = req.user.userId;

    // Validate payment method
    const validMethods = ['credits', 'cash', 'hybrid'];
    if (!validMethods.includes(paymentMethod)) {
      return res.status(400).json({ error: 'Invalid payment method. Use credits, cash or hybrid' });
    }

    // Check service exists
    const service = await prisma.service.findUnique({
      where: { id: serviceId }
    });
    if (!service) {
      return res.status(404).json({ error: 'Service not found' });
    }

    // Cannot book your own service
    if (service.providerId === requesterId) {
      return res.status(400).json({ error: 'You cannot book your own service' });

    }
    const requester = await prisma.user.findUnique({
  where: { id: requesterId },
  include: {
    bookingsAsRequester: true,
    reviewsGiven: true
  }
});

const fraudResult = await fraudCheck(requesterId, {
  totalBookings: requester.bookingsAsRequester.length,
  totalReviews: requester.reviewsGiven.length,
  accountAge: requester.createdAt
});
// If ML flags as suspicious, update user and warn
if (fraudResult.isSuspicious) {
  await prisma.user.update({
    where: { id: requesterId },
    data: { isFlagged: true }
  });
  console.warn(`User ${requesterId} flagged as suspicious`);
}

    // Create the booking
    const booking = await prisma.booking.create({
  data: {
    serviceId,
    requesterId,
    providerId: service.providerId,
    paymentMethod,
    creditAmount: creditAmount ? parseFloat(creditAmount) : 0,
    cashAmount: cashAmount ? parseFloat(cashAmount) : 0,
    status: 'pending',
    escrowStatus: 'held',
    scheduledAt: scheduledAt ? new Date(scheduledAt) : null
  },
      include: {
        service: true,
        requester: { select: { id: true, name: true, email: true } },
        provider: { select: { id: true, name: true, email: true } }
      }
    });

    // TODO: Payments team will add credit freezing and Razorpay order here

    res.status(201).json({
      message: 'Booking created successfully',
      booking
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Something went wrong' });
  }
};

// GET ALL BOOKINGS FOR LOGGED IN USER
const getMyBookings = async (req, res) => {
  try {
    const userId = req.user.userId;

    const bookings = await prisma.booking.findMany({
      where: {
        OR: [
          { requesterId: userId },
          { providerId: userId }
        ]
      },
      include: {
        service: true,
        requester: { select: { id: true, name: true, email: true } },
        provider: { select: { id: true, name: true, email: true } }
      },
      orderBy: { createdAt: 'desc' }
    });

    res.json({ bookings });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Something went wrong' });
  }
};

// GET SINGLE BOOKING
const getBookingById = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.userId;

    const booking = await prisma.booking.findUnique({
      where: { id },
      include: {
        service: true,
        requester: { select: { id: true, name: true, email: true } },
        provider: { select: { id: true, name: true, email: true } }
      }
    });

    if (!booking) {
      return res.status(404).json({ error: 'Booking not found' });
    }

    // Only requester or provider can view the booking
    if (booking.requesterId !== userId && booking.providerId !== userId) {
      return res.status(403).json({ error: 'Not authorized to view this booking' });
    }

    res.json({ booking });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Something went wrong' });
  }
};

// UPDATE BOOKING STATUS
const updateBookingStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const userId = req.user.userId;

    const booking = await prisma.booking.findUnique({ where: { id } });
    if (!booking) {
      return res.status(404).json({ error: 'Booking not found' });
    }

    // Define who can do what
    const providerActions = ['confirmed', 'cancelled'];
    const requesterActions = ['cancelled'];
    const completionActions = ['completed'];

    if (completionActions.includes(status) && booking.providerId !== userId) {
      return res.status(403).json({ error: 'Only the provider can mark a booking as completed' });
    }

    if (providerActions.includes(status) && booking.providerId !== userId) {
      return res.status(403).json({ error: 'Only the provider can confirm or cancel this booking' });
    }

    if (status === 'cancelled' && booking.requesterId !== userId && booking.providerId !== userId) {
      return res.status(403).json({ error: 'Not authorized to cancel this booking' });
    }

    const updated = await prisma.booking.update({
      where: { id },
      data: { status }
    });

    // TODO: Payments team will add escrow release / refund logic here

    res.json({
      message: `Booking ${status} successfully`,
      booking: updated
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Something went wrong' });
  }
};

module.exports = { createBooking, getMyBookings, getBookingById, updateBookingStatus };
