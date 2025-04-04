

import React, { useState } from 'react';
import { data, useNavigate } from 'react-router-dom';

const Login = (almacenarTokenp) => {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [apiResponse, setApiResponse] = useState(null); // Guardar la respuesta del API
  const [error, setError] = useState(null);
  const [token , setToken] = useState(null)
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault(); // Evitar recarga de página
    

    try {
      const response = await fetch('http://127.0.0.1:8000/login', {
        method: 'POST', // Si el endpoint requiere un POST
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            tipo_usuario : "auxiliar",
            nro_doc: userId,
            password: password,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setApiResponse(data);
      setToken(data.token);
      console.log('Datos obtenidos:', data); // Log para comprobar la respuesta

      almacenarTokenp.almacenarTokenp(data.token)

      navigate('/prueba')
      
    } catch (err) {
      setError(err.message);
      console.error('Error al realizar el fetch:', err);
    }
  };

  return (
    <div className="form-contenedor login-contenedor">
      <form onSubmit={(e) => {handleSubmit(e)}}>
        <h1>Inicia sesión aquí</h1>
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
      {token && <p>{token}</p>}
      {apiResponse && <p>Respuesta del servidor: {JSON.stringify(apiResponse)}</p>}
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
    </div>
  );
};

export default Login;
