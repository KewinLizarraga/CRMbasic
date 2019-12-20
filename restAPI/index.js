const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const router = require('./routes');

const app = express();

const PORT = 5000;

mongoose.connect('mongodb://localhost/restapiDB', { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Se establecio correctamente la conexion con MongoDB'))
  .catch(err => console.log('Error en la conexion de MongoDB', err));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan('tiny'));

app.use('/api', router);

app.use(express.static('uploads'));

app.listen(PORT, () => console.log(`APIrest run in PORT: ${PORT}`));
