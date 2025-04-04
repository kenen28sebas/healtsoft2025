import React, { useState } from "react";
import Alerta from "./alerta";

const FormularioPaciente = ({isOpen}) => {
    let abrirFormCitas = isOpen

    if(!abrirFormCitas) return null ;
  // Estados para cada campo del JSON
  const [estrato, setEstrato] = useState("");
  const [grupoAtencionEspecial, setGrupoAtencionEspecial] = useState("");
  const [grupoSanguineo, setGrupoSanguineo] = useState("");
  const [ocupacion, setOcupacion] = useState("");
  const [regimen, setRegimen] = useState("");
  const [tipoAfiliacion, setTipoAfiliacion] = useState("");

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
        sexo,
        estado_civil: estadoCivil,
        telefono,
        nacionalidad,
        municipio,
        username,
        first_name: firstName,
        last_name: lastName,
        email,
        password,
      },
    };

    try {
      const response = await fetch("http://127.0.0.1:8000/registrar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      
      if (response.ok) {
        setOpenAlerta(true);
        setTimeout(() => setOpenAlerta(false), 3000); 
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
    <form onSubmit={handleSubmit}>
      <h1>Registro de Usuario</h1>
      
      {/* Campos principales */}
      <div>
        <label>Estrato:</label>
        <select value={estrato} onChange={(e) => setEstrato(e.target.value)}>
          <option value="1">Estrato 1</option>
          <option value="2">Estrato 2</option>
          <option value="3">Estrato 3</option>
          <option value="4">Estrato 4</option>
          <option value="5">Estrato 5</option>
          <option value="6">Estrato 6</option>
        </select>
      </div>
      <div>
        <label>Grupo de Atención Especial:</label>
        <select
          value={grupoAtencionEspecial}
          onChange={(e) => setGrupoAtencionEspecial(e.target.value)}
        >
          <option value="I">Indígena</option>
          <option value="N">Negro</option>
          <option value="D">Desplazado</option>
          <option value="O">Otro</option>
        </select>
      </div>
      <div>
        <label>Grupo Sanguíneo:</label>
        <select
          value={grupoSanguineo}
          onChange={(e) => setGrupoSanguineo(e.target.value)}
        >
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
      <div>
        <label>Ocupación:</label>
        <input
          type="text"
          value={ocupacion}
          onChange={(e) => setOcupacion(e.target.value)}
        />
      </div>
      <div>
        <label>Régimen:</label>
        <select value={regimen} onChange={(e) => setRegimen(e.target.value)}>
          <option value="RC">Régimen Contributivo</option>
          <option value="RS">Régimen Subsidiado</option>
          <option value="RE">Régimen Especial</option>
          <option value="PA">Particular</option>
        </select>
      </div>
      <div>
        <label>Tipo de Afiliación:</label>
        <select value={tipoAfiliacion} onChange={(e) => setTipoAfiliacion(e.target.value)}>
          <option value="COT">Cotizante</option>
          <option value="BEN">Beneficiario</option>
          <option value="ADI">Adicional</option>
          <option value="NC">No Cotizante</option>
        </select>
      </div>

      {/* Datos del Usuario */}
      <div>
        <label>Número de Documento:</label>
        <input
          type="text"
          value={nroDoc}
          onChange={(e) => setNroDoc(e.target.value)}
        />
      </div>
      <div>
        <label>Tipo de Documento:</label>
        <select value={tipoDoc} onChange={(e) => setTipoDoc(e.target.value)}>
          <option value="CC">Cédula de Ciudadanía</option>
          <option value="CE">Cédula de Extranjería</option>
          <option value="TI">Tarjeta de Identidad</option>
          <option value="RC">Registro Civil</option>
          <option value="PA">Pasaporte</option>
          <option value="ASI">Adulto sin Identificación</option>
          <option value="MSI">Menor sin Identificación</option>
        </select>
      </div>
      <div>
        <label>Lugar de Expedición:</label>
        <input
          type="text"
          value={lugarExpDoc}
          onChange={(e) => setLugarExpDoc(e.target.value)}
        />
      </div>
      <div>
        <label>Fecha de Expedición:</label>
        <input
          type="date"
          value={fechaExpDoc}
          onChange={(e) => setFechaExpDoc(e.target.value)}
        />
      </div>
      <div>
        <label>Fecha de Nacimiento:</label>
        <input
          type="date"
          value={fechaNacimiento}
          onChange={(e) => setFechaNacimiento(e.target.value)}
        />
      </div>
      <div>
        <label>Sexo:</label>
        <select value={sexo} onChange={(e) => setSexo(e.target.value)}>
          <option value="M">Masculino</option>
          <option value="F">Femenino</option>
          <option value="I">Indeterminado</option>
        </select>
      </div>
      <div>
        <label>Estado Civil:</label>
        <select value={estadoCivil} onChange={(e) => setEstadoCivil(e.target.value)}>
          <option value="Soltero">Soltero</option>
          <option value="Casado">Casado</option>
          <option value="Divorciado">Divorciado</option>
          <option value="Viudo">Viudo</option>
          <option value="Union Libre">Unión Libre</option>
          <option value="Separado">Separado</option>
        </select>
      </div>
      <div>
        <label>Teléfono:</label>
        <input
          type="text"
          value={telefono}
          onChange={(e) => setTelefono(e.target.value)}
        />
      </div>
      <div>
        <label>Nacionalidad:</label>
        <input
          type="text"
          value={nacionalidad}
          onChange={(e) => setNacionalidad(e.target.value)}
        />
      </div>
      <div>
        <label>Municipio:</label>
        <input
          type="text"
          value={municipio}
          onChange={(e) => setMunicipio(e.target.value)}
        />
      </div>
      <div>
        <label>Username:</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div>
        <label>Nombre:</label>
        <input
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
      </div>
      <div>
        <label>Apellido:</label>
        <input
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
      </div>
      <div>
        <label>Correo Electrónico:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        <label>Contraseña:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      
      <button type="submit">Registrar</button>
    </form>
    </>
  );
};

export default FormularioPaciente;
