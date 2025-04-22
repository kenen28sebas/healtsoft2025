import React from "react";
import "./datosBusquedaP.css"
const DatosBusquedaP = ({ datos, onClick ,tipo,isLock}) => {
  console.log(datos);
  return (
    <>
      <div className="usuario__container">
        <h1 className="usuario__title">Datos del Usuario</h1>
        <div className="usuario__section">
          <p className="usuario__label"><strong>Nombre:</strong></p>
          <p className="usuario__info">{datos.datos.usuario.first_name} {datos.datos.usuario.last_name}</p>
        </div>
        {isLock && (
          <div className="usuario__section">
            <p className="usuario__label"><strong>Correo Electrónico:</strong></p>
            <p className="usuario__info">{datos.datos.usuario.email}</p>
          </div>
        )}
        <div className="usuario__section">
          <p className="usuario__label"><strong>Tipo de Usuario:</strong></p>
          <p className="usuario__info">{datos.datos.tipo_usuario}</p>
        </div>
        {isLock && (
          <div className="usuario__section">
            <p className="usuario__label"><strong>Estado Civil:</strong></p>
            <p className="usuario__info">{datos.datos.usuario.estado_civil}</p>
          </div>
        )}
        <div className="usuario__section">
          <p className="usuario__label"><strong>Fecha de Nacimiento:</strong></p>
          <p className="usuario__info">{datos.datos.usuario.fecha_nacimiento}</p>
        </div>
        {isLock && (
          <div className="usuario__section">
            <p className="usuario__label"><strong>Lugar de Expedición del Documento:</strong></p>
            <p className="usuario__info">{datos.datos.usuario.lugar_exp_doc}</p>
          </div>
        )}
        {isLock && (
          <div className="usuario__section">
            <p className="usuario__label"><strong>Municipio:</strong></p>
            <p className="usuario__info">{datos.datos.usuario.municipio}</p>
          </div>
        )}
        {isLock && (
          <div className="usuario__section">
            <p className="usuario__label"><strong>Nacionalidad:</strong></p>
            <p className="usuario__info">{datos.datos.usuario.nacionalidad}</p>
          </div>
        )}
        <div className="usuario__section">
          <p className="usuario__label"><strong>Número de Documento:</strong></p>
          <p className="usuario__info">{datos.datos.usuario.nro_doc}</p>
        </div>
        {isLock && (
          <div className="usuario__section">
            <p className="usuario__label"><strong>Teléfono:</strong></p>
            <p className="usuario__info">{datos.datos.usuario.telefono}</p>
          </div>
        )}
        <div className="usuario__section">
          <p className="usuario__label"><strong>Tipo de Documento:</strong></p>
          <p className="usuario__info">{datos.datos.usuario.tipo_doc}</p>
        </div>
      </div>

      {!isLock && <button onClick={onClick}>{tipo}</button>}
    </>
  );
};

export default DatosBusquedaP;
