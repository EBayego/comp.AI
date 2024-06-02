const { Pool } = require('pg');
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: 'webia_3345',
    port: 5432,
});

const getComponents = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM components');
    res.status(200).json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getComponents };