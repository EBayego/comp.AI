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
    const cpuResult = await pool.query('SELECT * FROM cpu_data ORDER BY "ReleaseDate" ASC LIMIT 6');
    const gpuResult = await pool.query('SELECT * FROM gpu_data ORDER BY "ReleaseDate" ASC LIMIT 6');
    const motherboardResult = await pool.query('SELECT * FROM motherboard_data WHERE "Price" IS NOT NULL LIMIT 6');
    const caseResult = await pool.query('SELECT * FROM case_data WHERE "Price" IS NOT NULL LIMIT 6');

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

const searchProducts = async (req, res) => {
  const { category, search, maxPrice, limit = 25, offset = 0 } = req.query;

  const queries = [];
  const params = [];
  let queryIndex = 1;

  const addQuery = (table) => {
    let query = `SELECT * FROM ${table} WHERE 1=1`;

    if (search) {
      query += ` AND "Name" ILIKE $${queryIndex++}`;
      params.push(`%${search}%`);
    }

    if (maxPrice) {
      query += ` AND "Price" <= $${queryIndex++}`;
      params.push(maxPrice);
    }

    query += ` LIMIT $${queryIndex++} OFFSET $${queryIndex++}`;
    params.push(limit, offset);

    queries.push(query);
  };

  if (category === 'cpu') addQuery('cpu_data');
  if (category === 'gpu') addQuery('gpu_data');
  if (category === 'motherboard') addQuery('motherboard_data');
  if (category === 'case') addQuery('case_data');

  if (queries.length === 0) {
    return res.status(400).json({ error: 'Invalid category' });
  }

  try {
    const results = await Promise.all(queries.map(q => pool.query(q, params)));
    const allResults = results.flatMap(result => result.rows);
    res.status(200).json(allResults);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getPopularProducts, searchProducts };