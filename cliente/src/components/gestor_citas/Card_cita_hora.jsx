import React from "react";
import Formulario_cita from "./formulario_cita";
import { useState } from "react";

const Card_cita_horas = ({hora,token,dia}) => {
    const [open,setOpen] = useState(false)

    function handleOpen(){
        setOpen(true)
    }    

    return(
        <>
        <div onClick={handleOpen}>
            <p>{hora}</p>
        </div>
        <Formulario_cita isOpen={open} dia={dia} token={token} hora={hora}></Formulario_cita>
        </>
    )
}

export default Card_cita_horas