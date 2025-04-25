import react, { useState } from "react";
import DatosBusuqedaP from "./DatosBusquedaP";
import "./buscarPaciente.css"
import React from 'react';
import Lupa from '/lupa.png'
import reactLogo from '../../assets/react.svg';

const BuscarPaciente = ({children,isOpen,token,tipo,isLock,userid,textoo}) => {
    console.log(userid)
    const [userId , setUserId] = useState(userid)
    const [nro_doc, setNro_doc] = useState(null)
    const [childrenIsOpen , setChildrenIsOpen ] = useState(false)
    const [paciente , setPaciente] = useState(null)
    const [mensaje , setMensaje] = useState(false)
    console.log(paciente)
    function urlFiltrar (paciente){
        const url =  `http://127.0.0.1:8000/getPaciente/${paciente}/`
        return url
    }
    const header = {
        'Content-Type': 'application/json',
        'Authorization': `Token ${token}`
    }
    const cargarDatos = async (numid) => {
        try{
            const response = await fetch(urlFiltrar(numid),
        {
            method  : "GET",
            headers : header
        }
        )
        const datos = await response.json()
        if(response.ok){
            setMensaje(false)
            setPaciente(datos)
        }
        
        console.log(datos)
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
        }
        catch (err) {
            setMensaje(true)
            setPaciente(null)
            console.error('Error al realizar el fetch:', err);
          }
        
    }

    if (!isOpen){
        console.log(childrenIsOpen)
        if(paciente){
            setPaciente(null)
            setChildrenIsOpen(false)
        }
        return (null)}
        let medicoId = nro_doc
    return(
        <>
        <div className="buscar_paciente">
            {textoo && <h1 className="textoo">{textoo}</h1>}
        {!childrenIsOpen &&
        <div className="buscar_paciente__contenedor_buscar">
        
            <div className="buscar_paciente__contenedor_input">
                <input 
                type="text"
                placeholder="Buscar paciente"
                onChange={(e) => {setNro_doc(e.target.value)}} />
                <div className="buscar_paciente__lupa" > 
                <button onClick={(e) => {cargarDatos(nro_doc);console.log(nro_doc)}}>
                    <img src={Lupa} alt="" className="buscar_paciente__img" style={{ filter: 'brightness(1.2)' }}/>
                </button>
                </div>
                
            </div>
        </div>
        }

        {mensaje && <h1>no se encontro paciente</h1>}

        {paciente && 
        <DatosBusuqedaP tipo={tipo} datos={paciente} onClick={() => {setChildrenIsOpen(true)}} isLock={isLock}></DatosBusuqedaP>}     

        {childrenIsOpen && react.cloneElement(children , {nro_doc,userId,token}) }
        </div>
        </>
    )

}

export default BuscarPaciente