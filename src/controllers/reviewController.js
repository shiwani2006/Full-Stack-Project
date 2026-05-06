const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// CREATE A REVIEW
const createReview = async (req, res) => {
  try {
    const { bookingId, rating, comment } = req.body;
    const reviewerId = req.user.userId;

    // Validate rating
    if (!rating || rating < 1 || rating > 5) {
      return res.status(400).json({ error: 'Rating must be between 1 and 5' });
    }

    // Check booking exists
    const booking = await prisma.booking.findUnique({
      where: { id: bookingId }
    });

    if (!booking) {
      return res.status(404).json({ error: 'Booking not found' });
    }

    // Only the requester can leave a review
    if (booking.requesterId !== reviewerId) {
      return res.status(403).json({ error: 'Only the requester can leave a review' });
    }

    // Booking must be completed
    if (booking.status !== 'completed') {
      return res.status(400).json({ error: 'You can only review a completed booking' });
    }

    // Check if review already exists
    const existingReview = await prisma.review.findUnique({
      where: { bookingId }
    });
    if (existingReview) {
      return res.status(400).json({ error: 'You have already reviewed this booking' });
    }

    const review = await prisma.review.create({
      data: {
        bookingId,
        reviewerId,
        providerId: booking.providerId,
        rating: parseInt(rating),
        comment
      }
    });

    res.status(201).json({
      message: 'Review submitted successfully',
      review
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Something went wrong' });
  }
};

// GET ALL REVIEWS FOR A PROVIDER
const getProviderReviews = async (req, res) => {
  try {
    const { providerId } = req.params;

    const reviews = await prisma.review.findMany({
      where: { providerId },
      include: {
        reviewer: {
          select: { id: true, name: true }
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    // Calculate average rating
    const avgRating = reviews.length > 0
      ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
      : 0;

    res.json({
      providerId,
      averageRating: parseFloat(avgRating.toFixed(1)),
      totalReviews: reviews.length,
      reviews
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Something went wrong' });
  }
};

module.exports = { createReview, getProviderReviews };
