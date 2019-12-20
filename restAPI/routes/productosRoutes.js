const express = require('express');
const router = express.Router();

const productosController = require('../controllers/productosController');

router.post('/', productosController.subirArchivo, productosController.nuevoProducto);
router.get('/', productosController.mostrarProductos);
router.get('/:idProducto', productosController.mostrarProducto);
router.put('/:idProducto', productosController.subirArchivo, productosController.actualizarProducto);
router.delete('/:idProducto', productosController.eliminarProducto);

module.exports = router;