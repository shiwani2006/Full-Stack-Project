const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');
const prisma = new PrismaClient();

// GET MY PROFILE
const getMyProfile = async (req, res) => {
  try {
    const userId = req.user.userId;

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        email: true,
        creditBalance: true,
        role: true,
        isFlagged: true,
        createdAt: true,
        servicesOffered: true,
        bookingsAsProvider: {
          select: {
            id: true,
            status: true,
            paymentMethod: true,
            createdAt: true
          }
        },
        bookingsAsRequester: {
          select: {
            id: true,
            status: true,
            paymentMethod: true,
            createdAt: true
          }
        }
      }
    });

    res.json({ user });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Something went wrong' });
  }
};

// GET ANY USER'S PUBLIC PROFILE
const getUserById = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        creditBalance: true,
        createdAt: true,
        servicesOffered: {
          select: {
            id: true,
            title: true,
            description: true,
            tags: true,
            creditRate: true,
            cashRate: true
          }
        }
      }
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({ user });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Something went wrong' });
  }
};

// UPDATE MY PROFILE
const updateMyProfile = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { name, password } = req.body;

    const updateData = {};

    if (name) updateData.name = name;
    if (password) {
      updateData.password = await bcrypt.hash(password, 10);
    }

    const updated = await prisma.user.update({
      where: { id: userId },
      data: updateData,
      select: {
        id: true,
        name: true,
        email: true,
        creditBalance: true,
        role: true,
        createdAt: true
      }
    });

    res.json({
      message: 'Profile updated successfully',
      user: updated
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Something went wrong' });
  }
};
// GET ALL USERS (admin only)
const getAllUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        creditBalance: true,
        cashBalance: true,
        trustScore: true,
        isFlagged: true,
        createdAt: true
      },
      orderBy: { createdAt: 'desc' }
    });
    res.json({ users });
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong' });
  }
};

// BLOCK USER
const blockUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await prisma.user.update({
      where: { id },
      data: { isFlagged: true }
    });
    res.json({ message: 'User blocked successfully', user });
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong' });
  }
};

// UNBLOCK USER
const unblockUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await prisma.user.update({
      where: { id },
      data: { isFlagged: false }
    });
    res.json({ message: 'User unblocked successfully', user });
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong' });
  }
};

module.exports = { getMyProfile, getUserById, updateMyProfile, getAllUsers, blockUser, unblockUser };

