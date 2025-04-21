import React, { useEffect, useState } from "react";
import { Detallesips } from "./Detalles";

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
        <div>
            <h2>Lista Ips</h2>
            <table>
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Dirección</th>
                        <th>Nivel de categorización</th>
                        <th>Telefono</th>
                        <th>Detalles</th>
                    </tr>
                </thead>
                <tbody>
                    {lista.map(item =>(
                        <tr>
                            <td>{item.nombre}</td>
                            <td>{item.direccion}</td>
                            <td>{item.nivel_categorizacion}</td>
                            <td>{item.telefono}</td>
                            <td><button onClick={() => abrirdetallesIps(item)}>Ver detalles</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
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
        </>
        
    )
}

export default ListarIps