import React from "react";

const DatosBusquedaP = ({ datos, onClick ,tipo}) => {
  console.log(datos);
  return (
    <>
      <div>
        <h1>Datos del Usuario</h1>
        <div>
          <p><strong>Nombre:</strong></p>
          <p>{datos.datos.usuario.first_name} {datos.datos.usuario.last_name}</p>
        </div>
        <div>
          <p><strong>Correo Electrónico:</strong></p>
          <p>{datos.datos.usuario.email}</p>
        </div>
        <div>
          <p><strong>Tipo de Usuario:</strong></p>
          <p>{datos.datos.tipo_usuario}</p>
        </div>
        <div>
          <p><strong>Estado Civil:</strong></p>
          <p>{datos.datos.usuario.estado_civil}</p>
        </div>
        <div>
          <p><strong>Fecha de Nacimiento:</strong></p>
          <p>{datos.datos.usuario.fecha_nacimiento}</p>
        </div>
        <div>
          <p><strong>Lugar de Expedición del Documento:</strong></p>
          <p>{datos.datos.usuario.lugar_exp_doc}</p>
        </div>
        <div>
          <p><strong>Municipio:</strong></p>
          <p>{datos.datos.usuario.municipio}</p>
        </div>
        <div>
          <p><strong>Nacionalidad:</strong></p>
          <p>{datos.datos.usuario.nacionalidad}</p>
        </div>
        <div>
          <p><strong>Número de Documento:</strong></p>
          <p>{datos.datos.usuario.nro_doc}</p>
        </div>
        <div>
          <p><strong>Teléfono:</strong></p>
          <p>{datos.datos.usuario.telefono}</p>
        </div>
        <div>
          <p><strong>Tipo de Documento:</strong></p>
          <p>{datos.datos.usuario.tipo_doc}</p>
        </div>
      </div>
      <button onClick={onClick}>{tipo}</button>
    </>
  );
};

export default DatosBusquedaP;
