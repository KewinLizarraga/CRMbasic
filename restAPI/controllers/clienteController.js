const Clientes = require('../models').Clientes;

module.exports = {
  nuevoCliente: async (req, res, next) => {
    const clientes = new Clientes(req.body);
    try {
      await clientes.save();
      res.json({ mensaje: 'Se agrego un nuevo cliente' });
    } catch (error) {
      // console.log(error);
      res.send(error);
      next();
    }
  },
  mostrarClientes: async (req, res, next) => {
    try {
      const clientes = await Clientes.find({});
      res.json(clientes);
    } catch (error) {
      console.log(error);
      next();
    }
  },
  mostrarCliente: async (req, res, next) => {
    const cliente = await Clientes.findById(req.params.idCliente);

    if (!cliente) {
      res.json({ mensaje: 'Ese cliente no existe' });
      next();
    }
    res.json(cliente);
  },
  actualizarCliente: async (req, res, next) => {
    try {
      const cliente = await Clientes.findOneAndUpdate({ _id: req.params.idCliente }, req.body, { new: true });
      res.json(cliente);
    } catch (error) {
      // console.log(error);
      res.send(error);
      next();
    }
  },
  eliminarCliente: async (req, res, next) => {
    try {
      await Clientes.findOneAndDelete({ _id: req.params.idCliente });
      res.json({ mensaje: 'El cliente se ha eliminado' });
    } catch (error) {
      // console.log(error);
      res.send(error)
      next();
    }
  }
}