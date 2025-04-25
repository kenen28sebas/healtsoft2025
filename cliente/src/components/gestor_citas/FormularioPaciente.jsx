import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import Alerta from "./alerta";
import "./formularioP.css"


const FormularioPaciente = ({isOpen,isR}) => {
    let abrirFormCitas = isOpen

    if(!abrirFormCitas) return null ;
  // Estados para cada campo del JSON
  const [estrato, setEstrato] = useState("");
  const [grupoAtencionEspecial, setGrupoAtencionEspecial] = useState("");
  const [grupoSanguineo, setGrupoSanguineo] = useState("");
  const [ocupacion, setOcupacion] = useState("");
  const [regimen, setRegimen] = useState("");
  const [tipoAfiliacion, setTipoAfiliacion] = useState("");
  const navigate = useNavigate();
  // Estados para los datos del usuario
  const [nroDoc, setNroDoc] = useState("");
  const [tipoDoc, setTipoDoc] = useState("");
  const [lugarExpDoc, setLugarExpDoc] = useState("");
  const [fechaExpDoc, setFechaExpDoc] = useState("");
  const [fechaNacimiento, setFechaNacimiento] = useState("");
  const [sexo, setSexo] = useState("");
  const [estadoCivil, setEstadoCivil] = useState("");
  const [telefono, setTelefono] = useState("");
  const [nacionalidad, setNacionalidad] = useState("");
  const [municipio, setMunicipio] = useState("");
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [openAlerta, setOpenAlerta] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Crear el objeto final
    const formData = {
        tipo_usuario:"paciente",
      estrato,
      grupo_atencion_especial: grupoAtencionEspecial,
      grupo_sanguineo: grupoSanguineo,
      ocupacion,
      regimen,
      tipo_afiliacion: tipoAfiliacion,
      usuario: {
        nro_doc: nroDoc,
        tipo_doc: tipoDoc,
        lugar_exp_doc: lugarExpDoc,
        fecha_exp_doc: fechaExpDoc,
        fecha_nacimiento: fechaNacimiento,
        sexo :sexo,
        estado_civil: estadoCivil,
        telefono : telefono,
        nacionalidad : nacionalidad,
        municipio : municipio,
        username : username,
        first_name: firstName,
        last_name: lastName,
        email : email,
        password : password,
      },
    };

    
    function verificarErrores(errores, formData) {
      // Variable para almacenar todos los errores encontrados
      let hayErrores = false;
  
      // Recorrer los campos principales de `errores`
      for (const campo in errores) {
          // Si el campo es "usuario", manejar los subcampos
          if (campo === "usuario") {
              for (const subcampo in errores.usuario) {
                  if (!formData.usuario[subcampo]) {
                      alert(`Error en el campo "${subcampo}": ${errores.usuario[subcampo][0]}`);
                      hayErrores = true;
                  }
              }
          } else {
              // Validar campos principales fuera del objeto "usuario"
              if (!formData[campo]) {
                  alert(`Error en el campo "${campo}": ${errores[campo][0]}`);
                  hayErrores = true;
              }
          }
      }
  
      return !hayErrores; // Retorna true si no hay errores, false si los hay
  }
  
      const errores = {
        estrato: ['El valor seleccionado para el estrato no es válido.'],
        grupo_atencion_especial: ['El valor seleccionado para el grupo de atención especial no es válido.'],
        grupo_sanguineo: ['El valor seleccionado para el grupo sanguíneo no es válido.'],
        ocupacion: ['Este campo no puede estar vacío.'],
        regimen: ['El valor seleccionado para el régimen no es válido.'],
        tipo_afiliacion: ['El valor seleccionado para el tipo de afiliación no es válido.'],
        usuario: {
            estado_civil: ['El valor seleccionado para el estado civil no es válido.'],
            fecha_exp_doc: ['La fecha tiene un formato incorrecto. Usa uno de estos formatos: DD/MM/YYYY o YYYY-MM-DD.'],
            fecha_nacimiento: ['La fecha tiene un formato incorrecto. Usa uno de estos formatos: DD/MM/YYYY o YYYY-MM-DD.'],
            lugar_exp_doc: ['Este campo no puede estar vacío.'],
            municipio: ['Este campo no puede estar vacío.'],
            nacionalidad: ['Este campo no puede estar vacío.'],
            nro_doc: ['Este campo no puede estar vacío.'],
            password: ['Este campo no puede estar vacío.'],
            sexo: ['El valor seleccionado para el sexo no es válido.'],
            telefono: ['Este campo no puede estar vacío.'],
            tipo_doc: ['El valor seleccionado para el tipo de documento no es válido.'],
            username: ['Este campo no puede estar vacío.'],
            email: ['Este campo no puede estar vacío.']
        }
    };

    const datosValidados = verificarErrores(errores, formData);

    if (datosValidados) {
        console.log("Formulario validado correctamente.");
    } else {
        console.log("El formulario tiene errores.");
    }
      
    try {
      const response = await fetch("http://127.0.0.1:8000/registrar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json()
      console.log(data)
      
      if (response.ok) {
        setOpenAlerta(true);
        setTimeout(() => setOpenAlerta(false), 3000); 
        if (isR){
          navigate("/")
        }
      } else {
        console.error("Error en el registro.");
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
    }
  };

  return (
    <>
    <Alerta isOpen={openAlerta}>¡Registro exitoso!</Alerta>
    <form className="user-form" onSubmit={handleSubmit}>
      <h1 className="user-form__title">Registro de Usuario</h1>
      
      {/* Campos principales */}
      <div className="user-form__section">
        <label className="user-form__label">Estrato:</label>
        <select className="user-form__select" value={estrato} onChange={(e) => setEstrato(e.target.value)}>
          <option value="" disabled>Seleccione su estrato</option>
          <option value="1">Estrato 1</option>
          <option value="2">Estrato 2</option>
          <option value="3">Estrato 3</option>
          <option value="4">Estrato 4</option>
          <option value="5">Estrato 5</option>
          <option value="6">Estrato 6</option>
        </select>
      </div>
      <div className="user-form__section">
        <label className="user-form__label">Grupo de Atención Especial:</label>
        <select
        className="user-form__select"
          value={grupoAtencionEspecial}
          onChange={(e) => setGrupoAtencionEspecial(e.target.value)}
        >
          <option value="" disabled>Seleccione su grupo de atencion especial </option>
          <option value="I">Indígena</option>
          <option value="N">Negro</option>
          <option value="D">Desplazado</option>
          <option value="O">Otro</option>
        </select>
      </div>
      <div className="user-form__section">
        <label className="user-form__label">Grupo Sanguíneo:</label>
        <select
        className="user-form__select"
          value={grupoSanguineo}
          onChange={(e) => setGrupoSanguineo(e.target.value)}
        >
          <option value="" disabled>Seleccione su grupo sangineo</option>
          <option value="A+">A Positivo</option>
          <option value="A-">A Negativo</option>
          <option value="B+">B Positivo</option>
          <option value="B-">B Negativo</option>
          <option value="AB+">AB Positivo</option>
          <option value="AB-">AB Negativo</option>
          <option value="O+">O Positivo</option>
          <option value="O-">O Negativo</option>
        </select>
      </div>
      <div className="user-form__section">
        <label className="user-form__label">Ocupación:</label>
        <input
        className="user-form__input"
          type="text"
          value={ocupacion}
          onChange={(e) => setOcupacion(e.target.value)}
        />
      </div>
      <div className="user-form__section">
        <label className="user-form__label">Régimen:</label>
        <select  className="user-form__select" value={regimen} onChange={(e) => setRegimen(e.target.value)}>
        <option value="" disabled>Seleccione su regimen </option>
          <option value="RC">Régimen Contributivo</option>
          <option value="RS">Régimen Subsidiado</option>
          <option value="RE">Régimen Especial</option>
          <option value="PA">Particular</option>
        </select>
      </div>
      <div className="user-form__section">
        <label className="user-form__label">Tipo de Afiliación:</label>
        <select className="user-form__select" value={tipoAfiliacion} onChange={(e) => setTipoAfiliacion(e.target.value)}>
        <option value="" disabled>Seleccione su tipo de afiliacion</option>
          <option value="COT">Cotizante</option>
          <option value="BEN">Beneficiario</option>
          <option value="ADI">Adicional</option>
          <option value="NC">No Cotizante</option>
        </select>
      </div>

      {/* Datos del Usuario */}
      <div className="user-form__section">
        <label className="user-form__label">Número de Documento:</label>
        <input
          className="user-form__input"
          type="text"
          value={nroDoc}
          onChange={(e) => setNroDoc(e.target.value)}
          maxLength="12"
        />
      </div>
      <div className="user-form__section">
        <label className="user-form__label">Tipo de Documento:</label>
        <select className="user-form__select" value={tipoDoc} onChange={(e) => setTipoDoc(e.target.value)}>
          <option value="" disabled> Eliga su tipo de documento</option>
          <option value="CC">Cédula de Ciudadanía</option>
          <option value="CE">Cédula de Extranjería</option>
          <option value="TI">Tarjeta de Identidad</option>
          <option value="RC">Registro Civil</option>
          <option value="PA">Pasaporte</option>
          <option value="ASI">Adulto sin Identificación</option>
          <option value="MSI">Menor sin Identificación</option>
        </select>
      </div>
      <div className="user-form__section">
        <label className="user-form__label">Lugar de Expedición:</label>
        <input
        className="user-form__input"
          type="text"
          value={lugarExpDoc}
          onChange={(e) => setLugarExpDoc(e.target.value)}
        />
      </div>
      <div className="user-form__section">
        <label className="user-form__label">Fecha de Expedición:</label>
        <input
        className="user-form__input"
          type="date"
          value={fechaExpDoc}
          onChange={(e) => setFechaExpDoc(e.target.value)}
        />
      </div>
      <div className="user-form__section">
        <label className="user-form__label">Fecha de Nacimiento:</label>
        <input
        className="user-form__input"
          type="date"
          value={fechaNacimiento}
          onChange={(e) => {
            const fechaIngresada = new Date(e.target.value); // Convertir el valor ingresado a una fecha
            const fechaActual = new Date(); // Fecha actual
            const fechaLimite = new Date(
                fechaActual.getFullYear() - 18,
                fechaActual.getMonth(),
                fechaActual.getDate()
            ); // Límite de 18 años menos

            if (fechaIngresada > fechaLimite) {
                // Si la fecha es mayor a la límite
                e.target.style.border = '2px solid red'; // Bordes rojos indicando error
                alert('Debes tener al menos 18 años'); // Mensaje de alerta
            } else {
                e.target.style.border = '2px solid #ccc'; // Bordes normales
                setFechaNacimiento(e.target.value); // Actualizar el estado si la fecha es válida
            }
        }}
        />
      </div>
      <div className="user-form__section">
        <label className="user-form__label">Sexo:</label>
        <select className="user-form__select" value={sexo} onChange={(e) => setSexo(e.target.value)}>
        <option value="" disabled>Seleccione su sexo </option>
          <option value="M">Masculino</option>
          <option value="F">Femenino</option>
          <option value="I">Indeterminado</option>
        </select>
      </div>
      <div className="user-form__section">
        <label className="user-form__label">Estado Civil:</label>
        <select className="user-form__select" value={estadoCivil} onChange={(e) => setEstadoCivil(e.target.value)}>
        <option value="" disabled>Seleccione su estado civil </option>
          <option value="Soltero">Soltero</option>
          <option value="Casado">Casado</option>
          <option value="Divorciado">Divorciado</option>
          <option value="Viudo">Viudo</option>
          <option value="Union Libre">Unión Libre</option>
          <option value="Separado">Separado</option>
        </select>
      </div>
      <div className="user-form__section">
        <label className="user-form__label">Teléfono:</label>
        <input
        className="user-form__input"
          type="text"
          value={telefono}
          onChange={(e) => setTelefono(e.target.value)}
        />
      </div>
      <div className="user-form__section">
        <label className="user-form__label">Nacionalidad:</label>
        <input
        className="user-form__input"
          type="text"
          value={nacionalidad}
          onChange={(e) => setNacionalidad(e.target.value)}
        />
      </div>
      <div className="user-form__section">
        <label className="user-form__label">Municipio:</label>
        <input
        className="user-form__input"
          type="text"
          value={municipio}
          onChange={(e) => setMunicipio(e.target.value)}
        />
      </div>
      <div className="user-form__section">
        <label className="user-form__label">Username:</label>
        <input
        className="user-form__input"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div className="user-form__section">
        <label className="user-form__label">Nombre:</label>
        <input
        className="user-form__input"
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
      </div>
      <div className="user-form__section">
        <label className="user-form__label">Apellido:</label>
        <input
        className="user-form__input"
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
      </div>
      
      <div className="user-form__section">
        <label className="user-form__label">Contraseña:</label>
        <input
    className="user-form__input"
    type="password"
    value={password}
    onChange={(e) => {
      if(e.target.value > 8){
        e.target.style.border = '2px solid red';
      }
      setPassword(e.target.value)}}
    maxLength="12"
/>
      </div>
      <div className="user-form__section">
        <label className="user-form__label">Correo Electrónico:</label>
        <input
        className="user-form__input"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <button className="user-form__button" type="submit">Registrar</button>
    </form>
    </>
  );
};

export default FormularioPaciente;
