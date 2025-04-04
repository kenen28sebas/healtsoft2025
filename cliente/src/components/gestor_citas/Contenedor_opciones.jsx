import React from "react";
import "./contenedor_opciones.css"

const Contenedor_opciones = ({lista,closeOther}) => {

    const listab = lista
    const botones = listab.map(opcion => <button className="opciones__boton" onClick={() => closeOther(opcion.titulo)}>{opcion.titulo}</button>)


    return(
        <>
        <div className="opciones">
            {botones}
        </div>
        </>

    )

}

export default Contenedor_opciones