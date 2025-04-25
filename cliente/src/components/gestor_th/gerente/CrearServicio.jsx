import React, { useEffect, useState } from "react";
import './formservicio.css'

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
    const [showModal, setShowModal] = useState(false);

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
    });
    const handleSubmit = async (e) =>{
        e.preventDefault();
        const respuesta = await fetch(ruta,{
            method : 'POST',
            headers : header,
            body : body,
        });
        setShowModal(true);
        setTimeout(() => {
            setShowModal(false);
        }, 3000);
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
        {showModal && (
        <div className="modal-overlay">
            <div className="modal">
                <h2>Guardando contenido...</h2>
                <div className="progress-line"></div>
            </div>
        </div>
)}
        <div className="contservicio">
            <form onSubmit={handleSubmit} className="formulariosservicio">
                <h1 className="tltservicio">Registrar servicio</h1>
                <div className="inputsservicio">
                    <label htmlFor="">Nombre</label>
                    <input 
                    type="text" 
                    id="nombre"
                    placeholder="Nombre del servicio"
                    className="inputsservicio"
                    value={nombre || ""}
                    onChange={(e) => setNombre(e.target.value)}
                    />
                </div>
                <div className="inputsservicio">
                    <label htmlFor="" className="labelservicio">Descripcion</label>
                    <input 
                    type="text"
                    id="descripcion"
                    placeholder="Descripcion"
                    className="inputsservicio"
                    value={descripcion || ""}
                    onChange={(e)=> setDescripcion(e.target.value)}
                    />
                </div>
                <div className="inputsservicio">
                    <label htmlFor="" className="labelservicio">Estado</label>
                    <input 
                    type="checkbox"
                    id="activo"
                    className="inputsservicio"
                    checked ={activo}
                    onChange={(e) => setActivo(e.target.checked)}
                    />
                </div>
                <div className="inputsservicio">
                    <label htmlFor="" className="labelservicio">Ips</label>
                    <select
                    className="inputsservicio"
                    name="ips"
                    id="ips"
                    value={ips}
                    onChange={(e) => setIps(e.target.value)}
                    >
                        <option value="" disabled={true}>Selecciona una ips</option>
                        {nlista}
                    </select>
                </div>
                <div className="inputsservicio">
                    <label htmlFor="" className="labelservicio">Codigo</label>
                    <input 
                    className="inputsservicio"
                    name="codigo"
                    id="codigo"
                    value={codigo || ""}
                    type="text" 
                    placeholder="codigo"
                    onChange={(e) => setCodigo(e.target.value)}
                    />
                </div>
                <button className="btnguardarservicio">Guardar</button>
            </form>
        </div>
        </>
    )
}
export default CrearServicio