import React, { useEffect, useState } from "react";

function CrearCargo ({token , abrirFormularioCrgo}){
    if (!abrirFormularioCrgo){
        return null
    }
    const [nombre , setNombre] = useState('')
    const [descripcion , setDescripcion] = useState('')
    const [estado , setEstado] = useState(null)
    const [ips , setIps] = useState('')
    // const [codigo , setCodigo] = useState('')
    const [lista , setLista] = useState([])

    const rutaconsulta = 'http://127.0.0.1:8000/consultar/ips/'
    const header = {
        'Content-Type' : 'application/json',
        'Authorization':`Token ${token.token}`
    }
    
    async function cargarLista () {
        const response = await fetch(rutaconsulta,{
            method : 'GET',
            headers : header
        })
        if (!response.ok){
            throw new Error (`HTTP error status ${response.status}`);
        }
        const datos = await response.json();
        console.log(datos)
        setLista(datos)
    }
    useEffect(() =>{
        cargarLista();

    },[])
    const ruta = 'http://127.0.0.1:8000/crear/cargo'
    const body = JSON.stringify({
        nombre : nombre,
        descripcion : descripcion,
        estado : estado,
        ips_id : ips,
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
        console.log('datos obtenidos:',data)
        console.log(body)
    }
    const nlista = lista.map(item => <option value={item.id}>{item.nombre}</option>)
    return(
        <>
        <div className="cont">
            <form onSubmit={handleSubmit} className="formularios">
                <div>
                    <input
                    className="inputs"
                    placeholder="Nombre del cargo"
                    id="nombre"
                    value={nombre}
                    type="text" 
                    onChange={(e) => setNombre(e.target.value)}
                    />
                </div>
                <div>
                    <input
                    className="inputs"
                    placeholder="descripcion"
                    id="descripcion"
                    value={descripcion || ""}
                    type="text"
                    onChange={(e) => setDescripcion(e.target.value)}
                    />
                </div>
                <div>
                    <input
                    className="inputs"
                    placeholder="Estado"
                    id="estado"
                    checked={estado}
                    type="checkbox"
                    onChange={(e) => setEstado(e.target.checked)} 
                    />
                </div>
                <div>
                    <select 
                    className="inputs"
                    name="ips"
                    id="ips"
                    value={ips || ""}
                    onChange={(e) => setIps(e.target.value)}
                    >
                        {nlista}
                    </select>
                </div>
                <button className="btnguardar">Guardar</button>
            </form>
        </div>
        </>
    )

}
export default CrearCargo