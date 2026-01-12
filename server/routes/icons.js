const express = require('express');
const router = express.Router();
const {
  createIcon,
  getIconById,
  getIconsByUserId,
  updateIcon,
  deleteIcon
} = require('../controllers/iconController');

router.post('/', createIcon);
router.get('/:id', getIconById);
router.get('/user/:userId', getIconsByUserId);
router.put('/:id', updateIcon);
router.delete('/:id', deleteIcon);

module.exports = router;
