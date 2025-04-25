import React, { useState } from "react";
import './experiencia.css'

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
        <div className="contenedorformexpl">
            <h1 className="tltregistrarexpl">Resgistrar Experiencia laboral</h1>
            <form action="" onSubmit={handleSubmitt} className="formexpl">
                <div className="divsinputs">
                    <div className="labelinputcont">
                        <label htmlFor="">Nombre de la empresa</label>
                        <input
                        value={nombreempresa || ""}
                        type="text" 
                        placeholder="Nombre de la empresa"
                        onChange={(e) => setnombreempresa(e.target.value)}
                        className="inputsexpl"
                        />
                    </div>
                    <div className="labelinputcont">
                        <label htmlFor="">Cargo</label>
                        <input
                        value={cargoo || ""}
                        type="text"
                        placeholder="cargo"
                        onChange={(e) => setcargoo(e.target.value)}
                        className="inputsexpl"
                        />
                    </div>
                </div>
                <div className="divsinputs">
                    <div  className="labelinputcont">
                        <label htmlFor="">Fecha de inicio</label>
                        <input
                        value={fechainicio || ""}
                        type="datE"
                        placeholder="Fecha de inicio"
                        onChange={(e) => setfechainicio(e.target.value)}
                        className="inputsexpl"
                        />
                    </div>
                    <div  className="labelinputcont">
                        <label htmlFor="">Fecha de finalizacion</label>
                        <input 
                        value={fechafin || ""}
                        type="text" 
                        placeholder="Fecha de finalizacion"
                        onChange={(e) => setfechafin(e.target.value)}
                        className="inputsexpl"
                        />
                    </div>
                </div>
                <div className="divsinputs">
                    <div  className="labelinputcont">
                        <label htmlFor="">Tipo de contrato</label>
                        <input
                        value={tipocontrato || ""}
                        type="text" 
                        placeholder="Tipo de contrato"
                        onChange={(e) => settipocontrato(e.target.value)}
                        className="inputsexpl"
                        />
                    </div>
                </div>
                <button className="btnguardarexperiencialaborla">Guardar</button>
            </form>
        </div>
        </>
    )
}

export default Experiencia