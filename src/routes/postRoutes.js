const express = require('express');
const router = express.Router();
const authenticate = require('../middleware/authMiddleware');
const { addPost, myPosts, feed } = require('../controllers/postController');

router.post('/posts', authenticate, addPost);
router.get('/my-posts', authenticate, myPosts);
router.get('/feed', authenticate, feed);

module.exports = router;
