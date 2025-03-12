import React from 'react';

const Registro = () => {
  return (
    <div className="form-contenedor registro-contenedor">
      <form action="#">
        <h1>Regístrate aquí</h1>
        <select id="selector">
          <option value="1">Cédula de ciudadanía</option>
          <option value="2">Cédula de extranjería</option>
          <option value="3">Pasaporte</option>
          <option value="4">Tarjeta de identidad</option>
        </select>
        <input type="text" placeholder="Número de identificación" />
        <input type="text" placeholder="Email" />
        <input type="text" placeholder="Contraseña" />
        <button>Registrarse</button>
        <span>O usa tu cuenta</span>
      </form>
    </div>
  );
};

export default Registro;
