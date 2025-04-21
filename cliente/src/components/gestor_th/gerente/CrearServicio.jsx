import React, { useEffect, useState } from "react";

function CrearServicio ({token , abrirformularioservicio}){
    if (!abrirformularioservicio){
        return null
    }
    const [nombre , setNombre] = useState('')
    const [descripcion , setDescripcion] = useState('')
    const [activo , setActivo] = useState(false)
    const [ips , setIps] = useState('')
    const [codigo , setCodigo] = useState('')
    const [lista , setLista] = useState([])

    const rutaconsulta = 'http://127.0.0.1:8000/consultar/ips/'
    const header = {
        'Content-Type' : 'application/json',
        'Authorization':`Token ${token.token}`
    }
    async function cargarLista (){
        const response = await fetch(rutaconsulta,{
            method : 'GET',
            headers : header,
        })
        if (!response.ok){
            throw new Error(`HTTP error ${response.status}`);
        }
        const datos = await response.json();
        console.log(datos)
        setLista(datos)
    }
    useEffect(() =>{
        cargarLista();
    },[])
    const ruta = 'http://127.0.0.1:8000/crear/servicio/'
    const body = JSON.stringify({
        nombre : nombre,
        descripcion : descripcion,
        activo : activo,
        ips_id : ips,
        codigo : codigo,
    })
    const handleSubmit = async (e) =>{
        e.preventDefault();
        const respuesta = await fetch(ruta,{
            method : 'POST',
            headers : header,
            body : body,
        });
        if (!respuesta.ok){
            throw new Error(`error ${respuesta.status}`);
        }
        const data = await respuesta.json();
        console.log('datos obtenidos jiji:',data);
        console.log(body)
    }
    const nlista = lista.map(item => <option value={item.id}>{item.nombre}</option>)

    return(
        <>
        <div className="cont">
            <form onSubmit={handleSubmit} className="formularios">
                <div>
                    <input 
                    type="text" 
                    id="nombre"
                    placeholder="Nombre del servicio"
                    className="inputs"
                    value={nombre || ""}
                    onChange={(e) => setNombre(e.target.value)}
                    />
                </div>
                <div>
                    <input 
                    type="text"
                    id="descripcion"
                    placeholder="Descripcion"
                    className="inputs"
                    value={descripcion || ""}
                    onChange={(e)=> setDescripcion(e.target.value)}
                    />
                </div>
                <div>
                    <input 
                    type="checkbox"
                    id="activo"
                    className="inputs"
                    checked ={activo}
                    onChange={(e) => setActivo(e.target.checked)}
                    />
                </div>
                <div>
                    <select
                    className="inputs"
                    name="ips"
                    id="ips"
                    value={ips}
                    onChange={(e) => setIps(e.target.value)}
                    >
                        {nlista}
                    </select>
                </div>
                <div>
                    <input 
                    className="inputs"
                    name="codigo"
                    id="codigo"
                    value={codigo || ""}
                    type="text" 
                    placeholder="codigo"
                    onChange={(e) => setCodigo(e.target.value)}
                    />
                </div>
                <button className="btnguardar">Guardar</button>
            </form>
        </div>
        </>
    )
}
export default CrearServicio