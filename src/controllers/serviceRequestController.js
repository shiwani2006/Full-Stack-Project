const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// USER: Post a new service request
const createServiceRequest = async (req, res) => {
  try {
    const { title, description, category, tags, budgetCredits, budgetCash } = req.body;
    const requesterId = req.user.userId;

    if (!title || !description) {
      return res.status(400).json({ error: 'Title and description are required' });
    }

    const serviceRequest = await prisma.serviceRequest.create({
      data: {
        title,
        description,
        category: category || null,
        tags: tags || [],
        budgetCredits: budgetCredits ? parseFloat(budgetCredits) : null,
        budgetCash: budgetCash ? parseFloat(budgetCash) : null,
        requesterId,
      },
      include: {
        requester: { select: { id: true, name: true, profileImage: true } },
      },
    });

    res.status(201).json({ message: 'Request posted successfully', serviceRequest });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Something went wrong' });
  }
};

// PUBLIC/PROVIDER: Get all open service requests
const getAllServiceRequests = async (req, res) => {
  try {
    const { category, status } = req.query;

    const serviceRequests = await prisma.serviceRequest.findMany({
      where: {
        status: status || 'open',
        ...(category && category !== 'All' ? { category } : {}),
      },
      include: {
        requester: { select: { id: true, name: true, profileImage: true } },
        offers: {
          select: { id: true, providerId: true, status: true },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    res.json({ serviceRequests });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Something went wrong' });
  }
};

// USER: Get their own requests
const getMyServiceRequests = async (req, res) => {
  try {
    const requesterId = req.user.userId;

    const serviceRequests = await prisma.serviceRequest.findMany({
      where: { requesterId },
      include: {
        offers: {
          include: {
            provider: { select: { id: true, name: true, profileImage: true } },
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    res.json({ serviceRequests });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Something went wrong' });
  }
};

// USER: Cancel their own request
const cancelServiceRequest = async (req, res) => {
  try {
    const { id } = req.params;
    const requesterId = req.user.userId;

    const existing = await prisma.serviceRequest.findUnique({ where: { id } });
    if (!existing || existing.requesterId !== requesterId) {
      return res.status(403).json({ error: 'Not authorized' });
    }

    const updated = await prisma.serviceRequest.update({
      where: { id },
      data: { status: 'cancelled' },
    });

    res.json({ message: 'Request cancelled', serviceRequest: updated });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Something went wrong' });
  }
};

// PROVIDER: Submit an offer on a user request
const createOffer = async (req, res) => {
  try {
    const { serviceRequestId } = req.params;
    const { message, proposedCredits, proposedCash } = req.body;
    const providerId = req.user.userId;

    const serviceRequest = await prisma.serviceRequest.findUnique({
      where: { id: serviceRequestId },
    });

    if (!serviceRequest || serviceRequest.status !== 'open') {
      return res.status(400).json({ error: 'Request not available' });
    }

    // Prevent duplicate offers from same provider
    const existing = await prisma.serviceOffer.findFirst({
      where: { serviceRequestId, providerId },
    });
    if (existing) {
      return res.status(400).json({ error: 'You already submitted an offer for this request' });
    }

    const offer = await prisma.serviceOffer.create({
      data: {
        serviceRequestId,
        providerId,
        message: message || null,
        proposedCredits: proposedCredits ? parseFloat(proposedCredits) : null,
        proposedCash: proposedCash ? parseFloat(proposedCash) : null,
      },
      include: {
        provider: { select: { id: true, name: true, profileImage: true } },
      },
    });

    res.status(201).json({ message: 'Offer submitted', offer });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Something went wrong' });
  }
};

// USER: Accept an offer (marks request fulfilled)
const acceptOffer = async (req, res) => {
  try {
    const { offerId } = req.params;
    const requesterId = req.user.userId;

    const offer = await prisma.serviceOffer.findUnique({
      where: { id: offerId },
      include: { serviceRequest: true },
    });

    if (!offer || offer.serviceRequest.requesterId !== requesterId) {
      return res.status(403).json({ error: 'Not authorized' });
    }

    // Accept this offer, reject others
    await prisma.serviceOffer.updateMany({
      where: { serviceRequestId: offer.serviceRequestId, id: { not: offerId } },
      data: { status: 'rejected' },
    });

    const accepted = await prisma.serviceOffer.update({
      where: { id: offerId },
      data: { status: 'accepted' },
    });

    await prisma.serviceRequest.update({
      where: { id: offer.serviceRequestId },
      data: { status: 'fulfilled' },
    });

    res.json({ message: 'Offer accepted', offer: accepted });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Something went wrong' });
  }
};

module.exports = {
  createServiceRequest,
  getAllServiceRequests,
  getMyServiceRequests,
  cancelServiceRequest,
  createOffer,
  acceptOffer,
};
