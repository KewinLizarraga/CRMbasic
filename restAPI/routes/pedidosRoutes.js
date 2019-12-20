const express = require('express');
const router = express.Router();

const pedidosController = require('../controllers/pedidosController');

router.post('/', pedidosController.nuevoPedido);
router.get('/', pedidosController.mostrarPedidos);
router.get('/:idPedido', pedidosController.mostrarPedido);
router.put('/:idPedido', pedidosController.actualizarPedido);
router.delete('/:idPedido', pedidosController.eliminarPedido);

module.exports = router;