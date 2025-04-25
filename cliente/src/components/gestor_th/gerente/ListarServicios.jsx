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
        <div className="contenedorlistadetalles contenedortable">
            <div className="tablagenial">
                <h2 className="tltlista">Lista de servicios</h2>
                <table className="tableips">
                    <thead className="cabezatablaips">
                        <tr className="encabezadosips">
                            <th className="tltipsn">Nombre</th>
                            <th className="tltipsn">Descripción</th>
                            <th className="tltipsn">Codigo</th>
                            <th className="tltipsn">Detalles</th>
                            <th className="tltipsn">Estado</th>
                        </tr>
                    </thead>
                    <tbody className="cuerpotableips">
                        {lista.map(item =>(
                            <tr className="cuerpoopips">
                                <td className="optdtabla">{item.nombre}</td>
                                <td className="optdtabla">{item.descripcion}</td>
                                <td className="optdtabla">{item.codigo}</td>
                                <td style={{ color: item.activo ? 'green' : 'red', fontWeight: 'bold' }} className="optdtabla">
                                    {item.activo ? 'Activo' : 'Inactivo'}
                                </td>
                                <td className="optdtabla"><button onClick={() => abrirdetalles(item)} className="verdetallesips">Ver detalles</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
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