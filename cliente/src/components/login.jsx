

import React, { useState } from 'react';
import { data, useNavigate } from 'react-router-dom';
import Mensaje from './Mensaje';

const Login = (almacenarTokenp) => {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [apiResponse, setApiResponse] = useState(null); // Guardar la respuesta del API
  const [error, setError] = useState(null);
  const [token , setToken] = useState(null)
  const [showModal, setShowModal] = useState(false);
  const [tipo, setTipo] = useState(null)
  const closeModal = () => setShowModal(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    console.log(tipo)
    e.preventDefault(); // Evitar recarga de página
    try {
      const response = await fetch('http://127.0.0.1:8000/login', {
        method: 'POST', // Si el endpoint requiere un POST
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            tipo_usuario : tipo,
            nro_doc: userId,
            password: password,
        }),
      });

      if (!response.ok) {
        setShowModal(true)
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      else{
        const data = await response.json();
        setApiResponse(data);
        setToken(data.token);
        console.log('Datos obtenidos:', data); // Log para comprobar la respuesta

        almacenarTokenp.almacenarTokenp(data.token)
        switch(tipo){
          case "medico":
            navigate('/historia/Medico')
            break;
          case "auxiliar":
            navigate('/prueba')
            break; 
          case "paciente":
            navigate('/prueba')
            break; 
        }

        
      }
      
      
    } catch (err) {
      setError(err.message);
      console.error('Error al realizar el fetch:', err);
    }
  };

  return (
    <div className="form-contenedor login-contenedor">
      <form onSubmit={(e) => {handleSubmit(e)}}>
        <h1>Inicia sesión aquí</h1>
        <select 
          name="tipo" 
          id=""
          value={tipo}
          onChange={(e) => {setTipo(e.target.value);console.log(tipo)}}
          required>
            <option value="" disabled>Tipo de usuario</option>
            <option value="medico">Medico</option>
            <option value="auxiliar">Auxiliar</option>
            <option value="paciente">Pacietne</option>
          </select>
        <input
          type="text"
          placeholder="Número de identificación"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Entrar</button>
      </form>

      {/* Mostrar respuesta o error */}
      {/* {token && <p>{token}</p>}
      {apiResponse && <p>Respuesta del servidor: {JSON.stringify(apiResponse)}</p>}
      {error && <p style={{ color: 'red' }}>Error: {error}</p>} */}
    {showModal && 
      <Mensaje closeModal={closeModal} >
      <h2>Error de autenticacion</h2>
      <p>La clave o usuario estan incorrectas</p>
      </Mensaje>}
    </div>
  );
};

export default Login;
