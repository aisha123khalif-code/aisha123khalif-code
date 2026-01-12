const express = require('express');
const router = express.Router();
const { createLimiter } = require('../middleware/rateLimiter');
const {
  createUser,
  getUserById,
  updateUser,
  deleteUser,
  getAllUsers
} = require('../controllers/userController');

router.post('/', createLimiter, createUser);
router.get('/', getAllUsers);
router.get('/:id', getUserById);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

module.exports = router;
