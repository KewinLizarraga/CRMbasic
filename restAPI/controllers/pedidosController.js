const Pedidos = require('../models').Pedidos;

module.exports = {
  nuevoPedido: async (req, res, next) => {
    const pedido = new Pedidos(req.body);
    try {
      await pedido.save();
      res.json({ mensaje: 'Se creo un nuevo pedido' });
    } catch (error) {
      console.log(error);
      next();
    }
  },
  mostrarPedidos: async (req, res, next) => {
    try {
      const pedidos = await Pedidos.find({}).populate('cliente').populate('pedido.producto');
      res.json(pedidos);
    } catch (error) {
      console.log(error);
      next();
    }
  },
  mostrarPedido: async (req, res, next) => {
    const pedido = await Pedidos.findById(req.params.idPedido).populate('cliente').populate('pedido.producto');
    if (!pedido) {
      res.json({ mensaje: 'Este pedido no existe' });
      next();
    }
    res.json(pedido);
  },
  actualizarPedido: async (req, res, next) => {
    try {
      let pedido = await Pedidos.findOneAndUpdate({ _id: req.params.idPedido }, req.body, { new: true })
        .populate('cliente').populate('pedido.producto');
      res.json(pedido);
    } catch (error) {
      console.log(error);
      next();
    }
  },
  eliminarPedido: async (req, res, next) => {
    try {
      await Pedidos.findOneAndDelete({ _id: req.params.idPedido });
      res.json({ mensaje: 'Se ha eliminado el pedido' });
    } catch (error) {
      console.log(error);
      next();
    }
  }
}