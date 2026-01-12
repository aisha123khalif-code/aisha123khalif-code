const express = require('express');
const router = express.Router();
const {
  createVideo,
  getVideoById,
  getVideosByUserId,
  updateVideo,
  deleteVideo
} = require('../controllers/videoController');

router.post('/', createVideo);
router.get('/:id', getVideoById);
router.get('/user/:userId', getVideosByUserId);
router.put('/:id', updateVideo);
router.delete('/:id', deleteVideo);

module.exports = router;
