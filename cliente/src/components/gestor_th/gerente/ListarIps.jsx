import React, { useEffect, useState } from "react";
import { Detallesips } from "./Detalles";
import './listaservicio.css'

function ListarIps({token , abrirListaIps}){
    if (!abrirListaIps){
        return null
    }
    const[abrirdetallesips , setabrirdetallesips] = useState(false)
    const [ips , setips] = useState(null)
    function abrirdetallesIps(item){
        setabrirdetallesips(true)
        setips(item)
    }
    function cerrardetallesips(){
        setabrirdetallesips(false)
    }
    const [lista , setLista] = useState([])
    const ruta = 'http://127.0.0.1:8000/consultar/ips/'
    const header ={
        'Content-Type' : 'application/json',
        'Authorization':`Token ${token.token}`
    }
    async function CrgarLista() {
        const response = await fetch(ruta,{
            method : 'GET',
            headers : header,
        });
        if(!response.ok){
            throw new Error(`HTTP error ${response.status}`);
        }
        const datos = await response.json();
        console.log(datos)
        setLista(datos)
    }
    useEffect(() =>{
        CrgarLista();
    },[])
    if(!lista)return(
        <>
        <h1>cargando</h1>
        </>
    )
    if(lista.length === 0){
        return(
            <>
            <h1>No hay ips disponibles</h1>
            </>
        )
    }
    return(
        <>
        <div className="contenedortable">
            <div className="tablagenial">
                <h2 className="tltlista">Lista Ips</h2>
                <table className="tableips">
                    <thead className="cabezatablaips">
                        <tr className="encabezadosips">
                            <th className="tltipsn">Nombre</th>
                            <th className="tltipsn">Dirección</th>
                            <th className="tltipsn">Nivel de categorización</th>
                            <th  className="tltipsn">Telefono</th>
                            <th className="tltipsn">Detalles</th>
                        </tr>
                    </thead>
                    <tbody className="cuerpotableips">
                        {lista.map(item =>(
                            <tr className="cuerpoopips">
                                <td className="optdtabla">{item.nombre}</td>
                                <td className="optdtabla">{item.direccion}</td>
                                <td className="optdtabla">{item.nivel_categorizacion}</td>
                                <td className="optdtabla">{item.telefono}</td>
                                <td className="optdtabla"><button onClick={() => abrirdetallesIps(item)} className="verdetallesips">Ver detalles</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="contenedordetaleeps">
                {ips && (
                    <Detallesips
                    abrirdetallesips={abrirdetallesips}
                    cerrardetallesips={cerrardetallesips}
                    nombre={ips.nombre}
                    direccion={ips.direccion}
                    nivel_categorizacion={ips.nivel_categorizacion}
                    telefono={ips.telefono}
                    token={token}
                    id={ips.id}
                    cargarListaNuevaips={CrgarLista}
                    />
                )}
            </div>
        </div>

        </>
        
    )
}

export default ListarIps