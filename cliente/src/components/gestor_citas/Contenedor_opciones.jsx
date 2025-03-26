import React from "react";

const Contenedor_opciones = ({lista,closeOther}) => {

    const listab = lista
    const botones = listab.map(opcion => <button onClick={() => closeOther(opcion.titulo)}>{opcion.titulo}</button>)


    return(
        <>
        <div className="navbar__botones">
            {botones}
        </div>
        </>

    )

}

export default Contenedor_opciones