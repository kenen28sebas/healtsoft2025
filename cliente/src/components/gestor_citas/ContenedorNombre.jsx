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
            <h1 className="info_usuario__nombre">{nombre}</h1>
            <p className="info_usuario__rol">{rol}</p>
        </div>
        
    </div>
        </>
    )

}