import React, { Fragment, useState } from 'react';
import Swal from 'sweetalert2';
import { withRouter } from 'react-router-dom';
import clienteAxios from '../../config/axios';

function NuevoCliente({ history }) {
  // cliente = state, guardarCliente = funcion para guardar el state
  const [cliente, guardarCliente] = useState({
    nombre: '',
    apellido: '',
    empresa: '',
    email: '',
    telefono: ''
  });
  // leer los datos del formulario
  const actualizarState = e => {
    // Alamacenar lo que el usuario escribe en el state
    guardarCliente({
      // tener una copia del state actual
      ...cliente,
      [e.target.name]: e.target.value
    });
    console.log(cliente);
  }
  // Añade en la RestAPI un cliente nuevo
  const agregarCliente = e => {
    e.preventDefault();
    // Enviar petición
    clienteAxios.post('/clientes', cliente)
      .then(res => {
        // Validar si hay errores de MongoDB
        if (res.data.code === 11000) {
          console.log('Error de duplicado de MongoDB');
          Swal.fire({
            icon: 'error',
            title: 'Hubo un error',
            text: 'Ese cliente ya esta registrado'
          })
        } else {
          console.log(res.data);
          Swal.fire(
            'Se agregó el cliente',
            res.data.mensaje,
            'success'
          )
        }
        // Redireccionar
        history.push('/');
      });
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
      <h2>Nuevo Cliente</h2>
      <form
        onSubmit={agregarCliente}
      >
        <legend>Llena todos los campos</legend>
        <div className="campo">
          <label>Nombre:</label>
          <input
            type="text"
            placeholder="Nombre Cliente"
            name="nombre"
            onChange={actualizarState}
          />
        </div>
        <div className="campo">
          <label>Apellido:</label>
          <input
            type="text"
            placeholder="Apellido Cliente"
            name="apellido"
            onChange={actualizarState}
          />
        </div>
        <div className="campo">
          <label>Empresa:</label>
          <input
            type="text"
            placeholder="Empresa Cliente"
            name="empresa"
            onChange={actualizarState}
          />
        </div>
        <div className="campo">
          <label>Email:</label>
          <input
            type="email"
            placeholder="Email Cliente"
            name="email"
            onChange={actualizarState}
          />
        </div>
        <div className="campo">
          <label>Teléfono:</label>
          <input
            type="tel"
            placeholder="Teléfono Cliente"
            name="telefono"
            onChange={actualizarState}
          />
        </div>

        <div className="enviar">
          <input
            type="submit"
            className="btn btn-azul"
            value="Agregar Cliente"
            disabled={validarCliente()}
          />
        </div>
      </form>
    </Fragment>
  );
}
// HOC, es una función que toma un componente y retorna un nuevo componente
export default withRouter(NuevoCliente);