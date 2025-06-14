const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  ssl: {
    rejectUnauthorized: false // required for Render
  }
});

pool.on('connect', () => {
  console.log('✅ Connected to PostgreSQL');
});

// Optional: run a test query
if (process.env.NODE_ENV !== 'test') {
  (async () => {
    try {
      const res = await pool.query('SELECT NOW()');
      console.log('Connected at:', res.rows[0].now);
    } catch (err) {
      console.error('❌ DB Connection Error:', err);
    }
  })();
}

module.exports = pool;
