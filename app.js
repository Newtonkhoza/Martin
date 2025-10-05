require('dotenv').config(); // Load env variables

const express = require('express');
const { Pool } = require('pg');

const app = express();
const PORT = process.env.PORT || 3000;

// Set up PostgreSQL connection pool
const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  ssl: {
    rejectUnauthorized: false // For AWS RDS SSL — optional, but required sometimes
  }
});

// Test route to check DB connection
app.get('/test-db', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()');
    res.json({ time: result.rows[0] });
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).send('Error connecting to the database');
  }
});

// Root route
app.get('/', (req, res) => {
  res.send('Hello from Express.js with PostgreSQL!');
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
