const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();

app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/authRoutes'));

module.exports = app;
