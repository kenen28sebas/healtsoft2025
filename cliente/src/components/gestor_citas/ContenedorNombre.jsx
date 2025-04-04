import React from "react";
import "./contenedorNombre.css"
import { data, Navigate, useNavigate } from 'react-router-dom';

export function ContenedorNombre({nombre,rol}){
    const navigate = useNavigate();

    function cerrarSesion () {
        navigate('/')
    }

    return(
        <>
        <div className="info_usuario">
        <div className="info_usuario__barra_cerrar">
            <h1>soft</h1>
            <button className="info_usuario__boton" onClick={cerrarSesion}>cerrar sesion</button>
        </div>
        
        <div className="info_usuario__barra_datos">
            <h1>{nombre}</h1>
            <p>{rol}</p>
        </div>
        
    </div>
        </>
    )

}