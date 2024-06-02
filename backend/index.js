const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
const componentsRouter = require('./routes/components');

const app = express();
app.use(cors());
app.use(express.json());

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: 'webia_3345',
  port: 5432,
});

app.use('/api', componentsRouter);

app.get('/', (req, res) => {
  res.send('Hola Mundo');
});

app.listen(5000, () => {
  console.log('Servidor corriendo en el puerto 5000');
});
