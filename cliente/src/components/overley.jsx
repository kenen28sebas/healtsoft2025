import React from 'react';

const Overlay = ({ onRegisterClick, onLoginClick }) => {
  return (
    <div className="overlay-contenedor">
      <div className="overlay">
        <div className="overlay-panel overlay-left">
          <h1 className="titulo">Bienvenido</h1>
          <p>
            ¡Hola de nuevo! Para acceder a nuestros servicios y disfrutar de todas sus funciones,
            por favor inicie sesión con sus credenciales.
          </p>
          <button className="boton btn" id="login" onClick={onLoginClick}>
            Entrar
          </button>
        </div>
        <div className="overlay-panel overlay-right">
          <h1 className="titulo">Bienvenido</h1>
          <p>
            ¿Aún no tienes una cuenta? Regístrate aquí para acceder a nuestro sistema de salud.
          </p>
          <button className="boton btn" id="registrar" onClick={onRegisterClick}>
            Registrarse
          </button>
        </div>
      </div>
    </div>
  );
};

export default Overlay;
