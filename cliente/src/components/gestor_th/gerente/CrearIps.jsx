import React, { useState } from "react";
import './fromularioips.css'
export default function CrearIps({token , abrirform}){

    if (!abrirform){
        return null
    }

    const [nombre , setNombre] = useState('')
    const [direccion , setDireccion] = useState('')
    const [nivel_categorizacion , setNivel] = useState('I')
    const [telefono , setTelefono] = useState('')
    const [showModal, setShowModal] = useState(false);

    const ruta = 'http://127.0.0.1:8000/ips/'
    const header = {
        'Content-Type' : 'application/json',
        'Authorization':`Token ${token.token}`
    }


    const handleSubmit = async (e) => {
        e.preventDefault();
        const body = JSON.stringify({
            nombre : nombre,
            direccion : direccion,
            nivel_categorizacion : nivel_categorizacion,
            telefono : telefono,
        });
        setShowModal(true);
        setTimeout(() => {
            setShowModal(false); 
        }, 3000);
        const respuesta = await fetch(ruta,{
            method : 'POST',
            headers : header,
            body : body,
        });
        if (!respuesta.ok){
            throw new Error(`HTTP error! status: ${respuesta.status}`);
        }
        const data = await respuesta.json();
        console.log('Datos obtenidos:',data);
        console.log(body);
    }
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
        <div className="cont">
            <form onSubmit={handleSubmit} className="formularioips">
                <h1 className="tltcrearips">Registrar eps</h1>
                <div className="contopciones">
                    <input 
                    placeholder="Nombre de la ips"
                    className="inputs"
                    type="text"
                    id="nombre"
                    value={nombre || ""}
                    onChange={(e) => setNombre(e.target.value)}
                    />
                </div>
                <div className="contopciones">
                    <input 
                    placeholder="Direccion"
                    className="inputs"
                    type="text"
                    id="direccion"
                    value={direccion || ""}
                    onChange={(e) => setDireccion(e.target.value)}
                    />
                </div>
                <div className="contopciones">
                    <select
                    placeholder="Nivel de categorizacion"
                    className="inputs"
                    id="nivel_categorizacion"
                    value={nivel_categorizacion}
                    onChange={(e) => setNivel(e.target.value)}
                    >
                        <option value="I">I</option>
                        <option value="II">II</option>
                        <option value="III">III</option>
                        <option value="IV">IV</option>
                    </select>
                </div>
                <div className="contopciones">
                    <input 
                    type="text"
                    className="inputs"
                    placeholder="Telefono"
                    id="telefono"
                    value={telefono || ""}
                    onChange={(e) => setTelefono(e.target.value)}
                    />
                </div>
                <button type="submit" className='btnguardarips'>Guardar</button>
            </form>
        </div>
        </>
    )
}