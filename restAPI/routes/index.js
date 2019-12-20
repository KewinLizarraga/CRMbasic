const express = require('express');
const router = express.Router();

const clientesRoutes = require('./clientesRoutes');
const productosRoutes = require('./productosRoutes');
const pedidosRoutes = require('./pedidosRoutes');

router.use('/clientes', clientesRoutes);
router.use('/productos', productosRoutes);
router.use('/pedidos', pedidosRoutes);

module.exports = router;