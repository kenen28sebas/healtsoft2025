import React, { useEffect, useState } from "react";
import Detallesservicio from "./Detalles";

function ListarServicios({token , abrirlistaservicios}){
    if (!abrirlistaservicios){
        return null
    }
    const [lista , setLista] = useState([])
    const[abrirdetallesservicio , setabrirdetallesservicio] = useState(false)
    const [servicio , setservicio] = useState(null)

    function abrirdetalles(item){
        setservicio(item)
        setabrirdetallesservicio(true)
    }
    function cerrardetalles(){
        setabrirdetallesservicio(false)
    }
    const url = 'http://127.0.0.1:8000/consultar/servicio'
    const header = {
        'Content-Type' : 'application/json',
        'Authorization':`Token ${token.token}`
    }
    async function cargarLista(){
        const response = await fetch(url,{
            method : 'GET',
            headers : header,
        })
        if (!response.ok){
            throw new Error(`HTTP error ${response.status}`)
        }
        const datos = await response.json();
        console.log(datos)
        setLista(datos)
    }
    useEffect(() =>{
        cargarLista()
    },[])
    if(!lista)return(
        <>
        <h1>Cargando</h1>
        </>
    )
    if(lista.length === 0){
        return(
            <>
            <h1>No hay servicios disponibles</h1>
            </>
        )
    }
    return(
        <>
        <div>
            <h2>Lista de servicios</h2>
            <table>
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Descripción</th>
                        <th>Codigo</th>
                        <th>Detalles</th>
                        <th>Estado</th>
                    </tr>
                </thead>
                <tbody>
                    {lista.map(item =>(
                        <tr>
                            <td>{item.nombre}</td>
                            <td>{item.descripcion}</td>
                            <td>{item.codigo}</td>
                            <td style={{ color: item.activo ? 'green' : 'red', fontWeight: 'bold' }}>
                                {item.activo ? 'Activo' : 'Inactivo'}
                            </td>
                            <td><button onClick={() => abrirdetalles(item)}>Ver detalles</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        {servicio && (
        <Detallesservicio 
        abrirdetallesservicio={abrirdetallesservicio}
        cerrardetallesservicio={cerrardetalles}
        nombre={servicio.nombre}
        descripcion={servicio.descripcion}
        codigo={servicio.codigo}
        activo={servicio.activo}
        token={token}
        codigoips={servicio.codigo}
        cargarListaNueva={cargarLista}
    />
)}
        </>
    )
}
export default ListarServicios