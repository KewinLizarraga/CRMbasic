const express = require('express');
const router = express.Router();

const clienteController = require('../controllers/clienteController');

router.post('/', clienteController.nuevoCliente);
router.get('/', clienteController.mostrarClientes);
router.get('/:idCliente', clienteController.mostrarCliente);
router.put('/:idCliente', clienteController.actualizarCliente);
router.delete('/:idCliente', clienteController.eliminarCliente);

module.exports = router;