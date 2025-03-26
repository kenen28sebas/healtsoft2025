import React, { useEffect, useState } from "react";
import "./listacitas.css"
const ListaCitas = ({token}) => {
    const [citas,setCitas] = useState([])
    const url = "http://127.0.0.1:8000/api/cita"
    const header = {
        'Content-Type': 'application/json',
        'Authorization': `Token ${token}`
    }
    const cargarCitas = async () => {
        const response = await fetch(url,{
            method: 'GET', 
            headers: header,
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          };
        const datos = await response.json();
        setCitas(datos)  
        console.log(datos)
    }   

    useEffect(() => {
        cargarCitas();
    }, []);

          if (!citas) {
            return <h1>Cargando citas...</h1>;
        }
        
        if (citas.length === 0) {
            return <h1>No hay citas disponibles</h1>;
        }

    return (
        <>
        <div className="tabla_citas">
            <table>
                <thead>
                    <tr>
                        <th>Prioridad</th>
                        <th>CUPS</th>
                        <th>Paciente</th>
                        <th>Médico</th>
                        <th>Estado</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>prioridad</td>
                        <td>cups</td>
                        <td>paciente</td>
                        <td>medico</td>
                        <td>estado</td>
                    </tr>
                </tbody>
            </table>
            </div>    
        </>
    );
}

export default ListaCitas