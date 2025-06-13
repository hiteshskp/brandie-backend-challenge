const express = require('express');
const router = express.Router();
const authenticate = require('../middleware/authMiddleware');

router.get('/protected', authenticate, (req, res) => {
  res.json({ message: `Hello user ${req.user.userId}, you are authenticated!` });
});

module.exports = router;
