const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { autoTagService } = require('../services/mlService');

// CREATE A SERVICE
const createService = async (req, res) => {
  try {
    const { title, description, creditRate, cashRate, category } = req.body;
    const providerId = req.user.userId;

    if (!creditRate && !cashRate) {
      return res.status(400).json({ error: 'Provide at least a credit rate or cash rate' });
    }

    // Call ML service to auto-tag the description
    let tags = req.body.tags || [];
    if (description) {
      const mlTags = await autoTagService(description);
      // merge manual tags with ML tags, remove duplicates
      tags = [...new Set([...tags, ...mlTags])];
    }
    const service = await prisma.service.create({
      data: {
        title,
        description,
        category: category || null,
        tags,
        creditRate: creditRate ? parseFloat(creditRate) : null,
        cashRate: cashRate ? parseFloat(cashRate) : null,
        providerId
  }
});

    res.status(201).json({
      message: 'Service created successfully',
      service
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Something went wrong' });
  }
};


// GET ALL SERVICES
const getAllServices = async (req, res) => {
  try {
    const { providerId } = req.query; // reads ?providerId=xxx from URL

    const services = await prisma.service.findMany({
      where: providerId ? { providerId } : {},
      include: {
        provider: {
          select: {
            id: true,
            name: true,
            creditBalance: true
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    res.json({ services });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Something went wrong' });
  }
};


// GET SINGLE SERVICE
const getServiceById = async (req, res) => {
  try {
    const { id } = req.params;

    const service = await prisma.service.findUnique({
      where: { id },
      include: {
        provider: {
          select: {
            id: true,
            name: true,
            creditBalance: true
          }
        }
      }
    });

    if (!service) {
      return res.status(404).json({ error: 'Service not found' });
    }

    res.json({ service });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Something went wrong' });
  }
};

module.exports = { createService, getAllServices, getServiceById }; 
