import React from "react";
import "./card_cita.css"
const Card_cita = ({dia,open}) =>{

    return(
        <>
        <div className="calendario__card_cita" onClick={open}>
            <h1>{dia}</h1>
        </div>
        </>
    )

}

export default Card_cita