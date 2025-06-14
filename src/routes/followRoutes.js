const express = require('express');
const router = express.Router();
const authenticate = require('../middleware/authMiddleware');
const {
  follow,
  unfollow,
  followers,
  following
} = require('../controllers/followController');

router.post('/follow/:userId', authenticate, follow);
router.delete('/unfollow/:userId', authenticate, unfollow);
router.get('/followers', authenticate, followers);
router.get('/following', authenticate, following);

module.exports = router;
