import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Mensaje from './Mensaje';

const Registro = () => {
  const [nrodoc , setNrodoc] = useState("")
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const closeModal = () => setShowModal(false);
  let urlApi = `http://127.0.0.1:8000/veriP/${nrodoc}/`
  async function consultarExistencia (e) {
    e.preventDefault(); 
    const response = await fetch(urlApi,
      {
        method: 'GET', 
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
    const verificar = await response.json()
    if (verificar.exist){
      setShowModal(true)
    }
    else{
      navigate('/formulario-paciente')
      
    }
  }

  return (
    <>
    <div className="form-contenedor registro-contenedor">
      <form action="#">
        <h1>Regístrate aquí</h1>
        <select id="selector">
          <option value="1">Cédula de ciudadanía</option>
          <option value="2">Cédula de extranjería</option>
          <option value="3">Pasaporte</option>
          <option value="4">Tarjeta de identidad</option>
        </select>
        <input 
          type="text" 
          placeholder="Número de identificación"
          value={nrodoc}
          onChange={(e) => setNrodoc(e.target.value)} />
        <button onClick={consultarExistencia}>Registrarse</button>
        <span>O usa tu cuenta</span>
      </form>
    </div>
    <div>{showModal && 
      <Mensaje closeModal={closeModal} >
      <h2>Ya existe</h2>
      <p>El paciente que intentas registrar ya existe.</p>
      </Mensaje>}
    </div>
    </>
  );
};

export default Registro;
