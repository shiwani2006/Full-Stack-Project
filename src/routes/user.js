const express = require('express');
const router = express.Router();
const { getMyProfile, getUserById, updateMyProfile, getAllUsers, blockUser, unblockUser } = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

router.get('/me', protect, getMyProfile);
router.get('/', protect, getAllUsers);              // admin: get all users
router.get('/:id', getUserById);
router.patch('/me', protect, updateMyProfile);
router.patch('/:id/block', protect, blockUser);    // admin: block user
router.patch('/:id/unblock', protect, unblockUser); // admin: unblock user

module.exports = router;