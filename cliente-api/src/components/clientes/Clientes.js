import React, { useEffect, useState, Fragment } from 'react';
import { Link } from 'react-router-dom';
// Importar cliente axios
import clienteAxios from '../../config/axios';

import Cliente from './Cliente';
import Spinner from '../layout/Spinner';

function Clientes() {
  // Trabajar con el state
  // clientes = state, guardarClientes = funcion para guardar el state
  const [clientes, guardarClientes] = useState([]);

  // Query a la API
  const consultarApi = async () => {
    const clientesConsulta = await clienteAxios.get('/clientes');
    // Colocar el resultado en el state
    guardarClientes(clientesConsulta.data);
  }

  useEffect(() => {
    consultarApi();
  }, [clientes]);

  if (!clientes.length) return <Spinner />

  return (
    <Fragment>
      <h2>Clientes</h2>

      <Link to={"/clientes/nuevo"} className="btn btn-verde nvo-cliente">
        <i className="fas fa-plus-circle"></i>
        Nuevo Cliente
      </Link>

      <ul className="listado-clientes">
        {clientes.map(cliente => (
          <Cliente
            key={cliente._id}
            cliente={cliente}
          />
        ))}
      </ul>
    </Fragment>
  )
}

export default Clientes;