const { Schema, model } = require('mongoose');

const productosSchema = new Schema({
  nombre: { type: String, trim: true },
  precio: Number,
  imagen: String
});

const Productos = model('Productos', productosSchema);

module.exports = Productos;