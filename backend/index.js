const express = require('express');
const cors = require('cors');
const componentsRouter = require('./routes/components');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api', componentsRouter);

app.get('/', (req, res) => {
  res.send('Hola Mundo');
});

app.listen(5000, () => {
  console.log('Servidor corriendo en el puerto 5000');
});
