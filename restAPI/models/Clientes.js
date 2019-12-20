const { Schema, model } = require('mongoose');

const clientesSchema = new Schema({
  nombre: { type: String, trim: true },
  apellido: { type: String, trim: true },
  empresa: { type: String, trim: true },
  email: { type: String, unique: true, lowercase: true, trim: true },
  telefono: { type: String, trim: true },
});

const Clientes = model('Clientes', clientesSchema);

module.exports = Clientes;