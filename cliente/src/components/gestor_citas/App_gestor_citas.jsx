import React from "react";
import Navbar from "./Navbar"
import { useState , useEffect } from "react";
import Registro from '../registro'
import Login from '../login'
import Overlay from '../overley'
import { ContenedorNombre } from "./ContenedorNombre";


const App_gestor_citas = (token) =>{

    const [datos,setDatos] = useState(null)
    const url = "http://127.0.0.1:8000/perfil"
    const header = {
        'Content-Type': 'application/json',
        'Authorization': `Token ${token.token}`
    }
    const cargarDatos = async () =>{
        try {
            const response = await fetch(url, 
                {
                    method  : "POST",
                    headers : header
                }
            );
      
            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
            }
      
            const data = await response.json();
            setDatos(data)

            console.log('Datos obtenidos:', data); // Log para comprobar la respuesta
      
            // almacenarTokenp.almacenarTokenp(data.token)
            
          } catch (err) {
            setError(err.message);
            console.error('Error al realizar el fetch:', err);
          }
    
    }
    useEffect(() => {
        cargarDatos();
      }, []);
    
    if(datos == null){
      return(
        <h1>nopi jijiji</h1>
      )
    }
    return(
        <>
        {datos && <ContenedorNombre nombre={datos.user.usuario.first_name} email={datos.user.usuario.email}/>}
        {datos && <ContenedorNombre email={datos.user.usuario.email}/>}
        
        </>
        
    )

}

export default App_gestor_citas