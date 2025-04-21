import React, { useEffect, useState } from "react";
import { DetallesCargo } from "./Detalles";

function ListarCargos({token , abrirlistacargos}){
    if (!abrirlistacargos){
        return (null)
    }
    const [lista , setLista] = useState([])
    const [abrirdetallescargo , setabrirdetallescargo] = useState(false)
    const[cargo, setcargo] = useState(null)
    
    function abrirdetallesCargo(item){
        setabrirdetallescargo(true)
        setcargo(item)
    }
    function cerrardetallesCargo(){
        setabrirdetallescargo(false)
    }

    const ruta = 'http://127.0.0.1:8000/consultar/cargos'
    const header = {
        'Content-Type' : 'application/json',
        'Authorization':`Token ${token.token}`
    }

    async function CargarLista() {
        const response = await fetch(ruta,{
            method : 'GET',
            headers : header
        })
        if (!response.ok){
            throw new Error(`HTTP error ${response.status}`)
        }
        const datos = await response.json();
        console.log(datos)
        setLista(datos)
    }
    useEffect(()=>{
        CargarLista()
    },[])
    if(!lista)return(
        <>
        <h1>cargando</h1>
        </>
    )
    if(lista.length === 0){
        return(
            <>
            <h1>No hay cargos disponibles</h1>
            </>
        )
    }

    return(
        <>
        <div>
            <h2>Cargos</h2>
            <table>
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Descripción</th>
                        <th>estado</th>
                        <th>Fecha de creación</th>
                        <th>Detalles</th>
                    </tr>
                </thead>
                <tbody>
                    {lista.map(item =>(
                        <tr>
                            <td>{item.nombre}</td>
                            <td>{item.descripcion}</td>
                            <td style={{ color: item.estado ? 'green' : 'red', fontWeight: 'bold' }}>
                                {item.estado ? 'Activo' : 'Inactivo'}
                            </td>
                            <td>{item.fecha_creacion}</td>
                            <td><button onClick={() => abrirdetallesCargo(item)}>Ver detalles</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        {cargo && (
            <DetallesCargo
            abrirdetallescargo={abrirdetallescargo}
            cerrardetallescargo={cerrardetallesCargo}
            nombre={cargo.nombre}
            descripcion={cargo.descripcion}
            estado={cargo.estado}
            fecha_creacion={cargo.fecha_creacion}
            id ={cargo.id}
            token={token}
            cargarListaNueva={CargarLista}
            />
        )}


        </>
    )

}
export default ListarCargos