import React, { useEffect, useState } from "react";
import "./listacitas.css"
import Alerta from "./alerta";
const ListaCitas = ({isOpen,token,nro_doc}) => {
    if (!isOpen){return null}
    const [citas,setCitas] = useState([])
    const [openAlerta , setOpenAlerta] = useState(false)

    const urlOpcion= () => {
        if (nro_doc == undefined){
            return "http://127.0.0.1:8000/api/cita"
        }
        if (nro_doc){
            return `http://127.0.0.1:8000/api/citaaux/?nro_doc=${nro_doc}`
        }
    }
    const url = urlOpcion()
    const header = {
        'Content-Type': 'application/json',
        'Authorization': `Token ${token}`
    }

    const eliminarCita = async (id) =>{
        const urlE = `http://127.0.0.1:8000/api/citaaux/${id}/`
        const response = await fetch(urlE,{
            method: 'DELETE', 
            headers: header,
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          };
          setOpenAlerta(true)
          setTimeout(() =>{
            setOpenAlerta(false);
            cargarCitas()
          }, 2000)
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
            console.log("no citas")
            return <h1>Cargando citas...</h1>;
        }
        
        if (citas.length === 0) {
            console.log("no citas")
            return <h1>No hay citas disponibles</h1>;
        }

    let filasCitas = []
    
    if (nro_doc == undefined){
        filasCitas = citas.map(cita => {
            return(<tr>
                <td>{cita.fecha_de_solicitud}</td>
                <td>{cita.fecha_de_asignacion}</td>
                <td>{cita.prioridad}</td>
                <td>{cita.cups}</td>
                <td>{cita.paciente}</td>
                <td>{cita.medico}</td>
                <td>{cita.estado}</td>
                {/* <td><button>Actualizar</button>
                <button>Borrar</button></td> */}
                
            </tr>)
            
        })   
    }

    if(nro_doc){
        filasCitas = citas.map(cita => {
            return(<tr>
                <td>{cita.fecha_de_solicitud}</td>
                <td>{cita.fecha_de_asignacion}</td>
                <td>{cita.prioridad}</td>
                <td>{cita.cups}</td>
                <td>{cita.paciente}</td>
                <td>{cita.medico}</td>
                <td>{cita.estado}</td>
                    <td><button >Actualizar</button>
                    <button onClick={() => eliminarCita(cita.id)}>Borrar</button></td>
                    
            </tr>)
            
        })   
    }
    

    return (
        <>
        <div className="styled-table">
            <table>
                <thead>
                    <tr>
                        <th>fecha_de_solicitud</th>
                        <th>fecha_de_asignacion</th>
                        <th>prioridad</th>
                        <th>cups</th>
                        <th>paciente</th>
                        <th>medico</th>
                        <th>estado</th>
                    </tr>
                </thead>
                <tbody>
                    {filasCitas}
                </tbody>
            </table>
            <Alerta isOpen={openAlerta}>
                <h1>Cita eliminada correctamente</h1>
            </Alerta>

            </div>    
        </>
    );
}

export default ListaCitas