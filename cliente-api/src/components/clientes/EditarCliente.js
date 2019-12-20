import React, { Fragment, useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { withRouter } from 'react-router-dom';
import clienteAxios from '../../config/axios';

function EditarCliente(props) {
  // Obtener el ID
  const { id } = props.match.params;
  // cliente = state, datosCliente = funcion para guardar el state
  const [cliente, datosCliente] = useState({
    nombre: '',
    apellido: '',
    empresa: '',
    email: '',
    telefono: ''
  });
  // Query a la API
  const consultarAPI = async () => {
    const clientesConsulta = await clienteAxios.get(`/clientes/${id}`);
    // Colocar el resultado en el state
    datosCliente(clientesConsulta.data);
  }
  // useEffect, cuando el componente carga
  useEffect(() => {
    consultarAPI();
  }, []);

  // leer los datos del formulario
  const actualizarState = e => {
    // Alamacenar lo que el usuario escribe en el state
    datosCliente({
      // tener una copia del state actual
      ...cliente,
      [e.target.name]: e.target.value
    });
  }
  // Envia una petición por axios, para actualizar el cliente
  const actualizarCliente = e => {
    e.preventDefault();
    // Enviar petición por axios
    clienteAxios.put(`/clientes/${cliente._id}`, cliente)
      .then(res => {
        // Validar si hay errores de MongoDB
        if (res.data.code === 11000) {
          Swal.fire({
            icon: 'error',
            title: 'Hubo un error',
            text: 'Ese cliente ya esta registrado'
          })
        } else {
          Swal.fire(
            'Correcto',
            'Se actualizo correctamente',
            'success'
          )
        }
        // Redireccionar
        props.history.push('/');
      })
  }

  // Validar el formulario
  const validarCliente = () => {
    // Destructuring
    const { nombre, apellido, empresa, email, telefono } = cliente;
    // Revisar que las propiedades del state tengan contenido
    let valido = !nombre.length || !apellido.length || !empresa.length || !email.length || !telefono.length;
    // Return true o false
    return valido;
  }

  return (
    <Fragment>
      <h2>Editar Cliente</h2>
      <form
        onSubmit={actualizarCliente}
      >
        <legend>Llena todos los campos</legend>
        <div className="campo">
          <label>Nombre:</label>
          <input
            type="text"
            placeholder="Nombre Cliente"
            name="nombre"
            onChange={actualizarState}
            defaultValue={cliente.nombre}
          />
        </div>
        <div className="campo">
          <label>Apellido:</label>
          <input
            type="text"
            placeholder="Apellido Cliente"
            name="apellido"
            onChange={actualizarState}
            defaultValue={cliente.apellido}
          />
        </div>
        <div className="campo">
          <label>Empresa:</label>
          <input
            type="text"
            placeholder="Empresa Cliente"
            name="empresa"
            onChange={actualizarState}
            defaultValue={cliente.empresa}
          />
        </div>
        <div className="campo">
          <label>Email:</label>
          <input
            type="email"
            placeholder="Email Cliente"
            name="email"
            onChange={actualizarState}
            defaultValue={cliente.email}
          />
        </div>
        <div className="campo">
          <label>Teléfono:</label>
          <input
            type="tel"
            placeholder="Teléfono Cliente"
            name="telefono"
            onChange={actualizarState}
            value={cliente.telefono}
          />
        </div>

        <div className="enviar">
          <input
            type="submit"
            className="btn btn-azul"
            value="Guardar Cambios"
            disabled={validarCliente()}
          />
        </div>
      </form>
    </Fragment>
  );
}
// HOC, es una función que toma un componente y retorna un nuevo componente
export default withRouter(EditarCliente);