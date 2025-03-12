

import React, { useState } from 'react';

const Login = () => {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [apiResponse, setApiResponse] = useState(null); // Guardar la respuesta del API
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault(); // Evitar recarga de página

    try {
      const response = await fetch('http://127.0.0.1:8000/login', {
        method: 'POST', // Si el endpoint requiere un POST
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            tipo_usuario : "medico",
            nro_doc: userId,
            password: password,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setApiResponse(data);
      console.log('Datos obtenidos:', data); // Log para comprobar la respuesta
    } catch (err) {
      setError(err.message);
      console.error('Error al realizar el fetch:', err);
    }
  };

  return (
    <div className="form-contenedor login-contenedor">
      <form onSubmit={handleSubmit}>
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
      {apiResponse && <p>Respuesta del servidor: {JSON.stringify(apiResponse)}</p>}
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
    </div>
  );
};

export default Login;
