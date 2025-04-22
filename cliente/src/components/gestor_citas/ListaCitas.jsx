import React, { useEffect, useState } from "react";
import "./listacitas.css"
import Alerta from "./alerta";
const ListaCitas = ({isOpen,token,nro_doc}) => {
    if (!isOpen){return null}
    const [citas,setCitas] = useState([])
    const [openAlerta , setOpenAlerta] = useState(false)
    const [searchTerm, setSearchTerm] = useState(''); // Estado para el término de búsqueda
    const [filteredCitas, setFilteredCitas] = useState(citas); // Estado para los datos filtrado
    const [isList , setIsList] = useState(true)
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
            return(<tr key={cita.id}>
                
                <td>{cita.fecha_de_solicitud}</td>
                <td>{cita.fecha_de_asignacion}</td>
                <td>{cita.prioridad}</td>
                <td>{cita.cups}</td>
                <td>{cita.paciente.usuario.first_name}</td>
                <td>{cita.medico}</td>
                <td>{cita.estado}</td>
                {/* <td><button>Actualizar</button>
                <button>Borrar</button></td> */}
                
            </tr>)
            
        })   
    }

    if(nro_doc){
        filasCitas = citas.map(cita => {
            return(<tr className="styled-table__row" key={cita.id}>
                <td className="styled-table__cell">{cita.fecha_de_solicitud}</td>
                <td className="styled-table__cell">{cita.fecha_de_asignacion}</td>
                <td className="styled-table__cell">{cita.prioridad}</td>
                <td className="styled-table__cell">{cita.cups}</td>
                <td className="styled-table__cell">{cita.paciente.usuario.first_name}</td>
                <td className="styled-table__cell">{cita.medico.usuario.first_name}</td>
                <td className="styled-table__cell">{cita.estado}</td>
                <td className="styled-table__actions-cell">
                    <button className="styled-table__button styled-table__button--update">Actualizar</button>
                    <button className="styled-table__button styled-table__button--delete" 
                        onClick={() => eliminarCita(cita.id)}>Borrar</button>
                </td>
            </tr>)
            
        })   
    }
    

    // Función para manejar el cambio del input
    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
        if (event.target.value == ""){
            setIsList(false)
        }
        // Filtrar las citas según el término de búsqueda
        const filtered = citas.filter((cita) =>
            Object.values(cita).some((value) =>
                String(value).toLowerCase().includes(event.target.value.toLowerCase())
            )
        );
        setFilteredCitas(filtered);
    };

    return (
        <>
        <div className="styled-table">
    <div className="styled-table__actions">
        <input
            type="text"
            className="styled-table__input"
            placeholder="Buscar..."
            value={searchTerm}
            onChange={handleSearchChange}
        />
        <button className="styled-table__clear-button" onClick={() => setFilteredCitas(citas)}>
            Limpiar filtro
        </button>
    </div>
    <table className="styled-table__table">
        <thead className="styled-table__header">
            <tr className="styled-table__row">
                <th className="styled-table__cell">fecha_de_solicitud</th>
                <th className="styled-table__cell">fecha_de_asignacion</th>
                <th className="styled-table__cell">prioridad</th>
                <th className="styled-table__cell">cups</th>
                <th className="styled-table__cell">paciente</th>
                <th className="styled-table__cell">medico</th>
                <th className="styled-table__cell">estado</th>
                <th className="styled-table__cell">acciones</th>
            </tr>
        </thead>
        <tbody className="styled-table__body">
                    {isList && filasCitas}
                    {filteredCitas.map((cita) => (
                        <tr className="styled-table__cell" key={cita.id}>
                            <td className="styled-table__cell">{cita.fecha_de_solicitud}</td>
                            <td className="styled-table__cell">{cita.fecha_de_asignacion}</td>
                            <td className="styled-table__cell">{cita.prioridad}</td>
                            <td className="styled-table__cell">{cita.cups}</td>
                            <td className="styled-table__cell">{cita.paciente.usuario.first_name}</td>
                            <td className="styled-table__cell">{cita.medico.usuario.first_name}</td>
                            <td className="styled-table__cell">{cita.estado}</td>
                        </tr>
                    ))}
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