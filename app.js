const express = require('express');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');
const testRoutes = require('./routes/testRoutes');

dotenv.config();
const app = express();

app.use(express.json()); // For parsing application/json

// Mount your auth routes under /api/auth
app.use('/api/auth', authRoutes);
app.use('/api/test', testRoutes);

// Optional: health check
app.get('/', (req, res) => {
  res.send('API is running...');
});

module.exports = app;
