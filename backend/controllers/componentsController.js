const { Pool } = require('pg');
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'compAI',
    password: 'webia_3345',
    port: 5432,
});

const getPopularProducts = async (req, res) => {
  try {
    const cpuResult = await pool.query('SELECT * FROM cpu_data ORDER BY "ReleaseDate" ASC LIMIT 5 WHERE "Price" IS NOT NULL');
    const gpuResult = await pool.query('SELECT * FROM gpu_data ORDER BY "ReleaseDate" ASC LIMIT 5 WHERE "Price" IS NOT NULL');
    const motherboardResult = await pool.query('SELECT * FROM motherboard_data LIMIT 5 WHERE "Price" IS NOT NULL');
    const caseResult = await pool.query('SELECT * FROM case_data LIMIT 5 WHERE "Price" IS NOT NULL');

    res.status(200).json({
      cpus: cpuResult.rows,
      gpus: gpuResult.rows,
      motherboards: motherboardResult.rows,
      cases: caseResult.rows
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getPopularProducts };