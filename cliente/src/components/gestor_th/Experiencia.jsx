import React, { useState } from "react";

function Experiencia ({token,id,numroid}){

    const [nombreempresa , setnombreempresa] = useState("")
    const[cargoo , setcargoo] = useState ("")
    const[fechainicio , setfechainicio] = useState("")
    const [fechafin , setfechafin] = useState("")
    const [tipocontrato , settipocontrato] = useState("")

    const ruta = 'http://127.0.0.1:8000/experiencia/'
    const body = JSON.stringify(
        {
            nro_doc:numroid,
            experiencia_laboral:[{
                nombre_empresa: nombreempresa,
                cargo: cargoo,
                fecha_inicio: fechainicio,
                fecha_finalizacion: fechafin,
                tipo_contrato: tipocontrato,
                hoja_vida: id
            }
            ]
        }
    )

    const header = {
        'Content-Type' : 'application/json',
        'Authorization' : `Token ${token.token}`
    }

    const handleSubmitt = async(e) =>{
        e.preventDefault();
        const respuesta3 = await fetch(ruta,{
            method : 'POST',
            headers : header,
            body : body,
        });
        if (! respuesta3.ok){
            throw new Error(`error jiji ${respuesta3.status}`)
        }
        const data = await respuesta3.json();
        console.log ('datos :', data)        
    }

    return(
        <>
        <h1>Resgistrar Experiencia laboral</h1>
        <div>
            <form action="" onSubmit={handleSubmitt}>
                <input
                value={nombreempresa || ""}
                type="text" 
                placeholder="Nombre de la empresa"
                onChange={(e) => setnombreempresa(e.target.value)}
                />
                <input
                value={cargoo || ""}
                type="text"
                placeholder="cargo"
                onChange={(e) => setcargoo(e.target.value)}
                />
                <input
                value={fechainicio || ""}
                type="dato"
                placeholder="Fecha de inicio"
                onChange={(e) => setfechainicio(e.target.value)}
                />
                <input 
                value={fechafin || ""}
                type="text" 
                placeholder="Fecha de finalizacion"
                onChange={(e) => setfechafin(e.target.value)}
                />
                <input
                value={tipocontrato || ""}
                type="text" 
                placeholder="Tipo de contrato"
                onChange={(e) => settipocontrato(e.target.value)}
                />
                <button>Guardar</button>
            </form>
        </div>
        </>
    )
}

export default Experiencia