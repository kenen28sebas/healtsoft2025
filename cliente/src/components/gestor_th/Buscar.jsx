import React, { useState } from "react";
import './Buscar.css'

function Buscar ({abrir , token ,children}){
    if (!abrir) return null
    console.log(token.token)
    const [numroid , setnumeroid] = useState("")
    const [hojadevida , sethojadevida] = useState()
    const [mostrarModal, setMostrarModal] = useState(false);

    const url = `http://127.0.0.1:8000/consultar/hoja/vida?nro_doc=${numroid}`
    const header = {
        'Content-Type' : 'application/json',
        'Authorization':`Token ${token.token}`
    }
    let id = null
    async function buscar_medico(){
        const respuesta = await fetch(url,{
            method : 'GET',
            headers : header,
        })
        const response = await respuesta.json()
        
        id = response.hoja_vida.id
        console.log(id)
        sethojadevida(response)
        setMostrarModal(true) 
        console.log(response)
    }
    return(
        <>
        <div className="contbuscar">
            <label htmlFor="" className="textbuscar">Numero de identificacion</label>
            <input type="text"
            value={numroid}
            className="inputbuscar"
            onChange={(e)=>{
                setnumeroid(e.target.value)
                console.log(numroid)
            }}
            />
            <button onClick={buscar_medico} className="bntbuscar">Buscar</button>
        </div>
        {mostrarModal && hojadevida && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h2>Resultado de la búsqueda</h2>
                        <p>Uusuario obtenido con exito</p>
                        <button onClick={() => setMostrarModal(false)} className="close-btn">Cerrar</button>
                    </div>
                </div>
            )}
        {React.cloneElement(children, { token , id , numroid})}
        </>
    )
}
export default Buscar

