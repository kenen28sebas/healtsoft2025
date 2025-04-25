import React, { useEffect, useState } from "react";
import { DetallesCargo } from "./Detalles";
import './detalleslistas.css'

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
        <div className="contenedorlistadetalles contenedortable">
            <div className="tablagenial">
                <h2 className="tltlista">Cargos</h2>
                <table className="tableips">
                    <thead className="cabezatablaips">
                        <tr className="encabezadosips">
                            <th className="tltipsn">Nombre</th>
                            <th className="tltipsn">Descripción</th>
                            <th className="tltipsn">estado</th>
                            <th className="tltipsn">Fecha de creación</th>
                            <th className="tltipsn">Detalles</th>
                        </tr>
                    </thead>
                    <tbody className="cuerpotableips">
                        {lista.map(item =>(
                            <tr className="cuerpoopips">
                                <td className="optdtabla">{item.nombre}</td>
                                <td className="optdtabla">{item.descripcion}</td>
                                <td style={{ color: item.estado ? 'green' : 'red', fontWeight: 'bold' }} className="optdtabla">
                                    {item.estado ? 'Activo' : 'Inactivo'}
                                </td>
                                <td className="optdtabla">{item.fecha_creacion}</td>
                                <td className="optdtabla"><button onClick={() => abrirdetallesCargo(item)} className="verdetallesips">Ver detalles</button></td>
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
        </div>
        </>
    )

}
export default ListarCargos