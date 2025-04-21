import React from 'react';

const Registro = () => {
  return (
    <div className="form-contenedor registro-contenedor">
      <form action="#" className='fromulariol'>
        <h1 className='tlt'>Regístrate aquí</h1>
        <select id="selector" className='selector'>
          <option value="1">Cédula de ciudadanía</option>
          <option value="2">Cédula de extranjería</option>
          <option value="3">Pasaporte</option>
          <option value="4">Tarjeta de identidad</option>
        </select>
        <input type="text" placeholder="Número de identificación" className='textos' />
        <input type="text" placeholder="Email" className='textos' />
        <input type="text" placeholder="Contraseña" className='textos'/>
        <button className='btn'>Registrarse</button>
        <span>O usa tu cuenta</span>
      </form>
    </div>
  );
};

export default Registro;
