import React from "react";
import Formulario_cita from "./formulario_cita";
import { useState } from "react";
import "./card_cita_horas.css"

const Card_cita_horas = ({hora,token,dia,nro_doc}) => {
    const [open,setOpen] = useState(false)

    function handleOpen(){
        setOpen(true)
    }    

    function handleClose(){
        setOpen(false)
    }

    return(
        <>
        <div className="card_cita_hora" onClick={handleOpen}>
            <p>{hora}</p>
        </div>
        <Formulario_cita isOpen={open} dia={dia} token={token} hora={hora} nro_doc={nro_doc} isClose={handleClose}></Formulario_cita>
        </>
    )
}

export default Card_cita_horas