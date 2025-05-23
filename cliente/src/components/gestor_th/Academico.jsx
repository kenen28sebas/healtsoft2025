import React, { useState } from "react";
import './Academico.css'
function Academico({token , id , numroid}){

    const [tituloobtenido , settituloobtenido] = useState("")
    const [institudionedu , setinstitudionedu] = useState("")
    const [fechainiciot , setfechainiciot] = useState("")
    const [fechaculminado , setfechaculminado] = useState("")
    const [niveleducativo , setniveleducativo] = useState("")

    const ruta = 'http://127.0.0.1:8000/academico/'
    const body = JSON.stringify({
        nro_doc : numroid,
        academico : [{
            nivel_educativo : niveleducativo,
            institucion_educativa : institudionedu,
            titulo_obtenido : tituloobtenido,
            fecha_inicio : fechainiciot,
            fecha_culminado : fechaculminado,
            hoja_vida_id : id,
        }
        ]
    })

    const header = {
        'Content-Type' : 'application/json',
        'Authorization' : `Token ${token.token}`
    }

    const handleSubmit = async (e) =>{
        e.preventDefault();
        const response = await fetch(ruta,{
            method : 'POST',
            headers : header,
            body : body,
        });

        if (!response){
            throw new Error(`error mauuu : ${response.status}`)
        }
        const data = await response.json()
        console.log(data)
    }


    return(
        <>
        <div className="forregistroaca">
            <h1 className="tltformacademico">Registrar academicos</h1>
            <form action="" onSubmit={handleSubmit} className="formregistroaca">
                <div className="inputscontdos">
                    <div className="inpustaca">
                        <label htmlFor="" className="textsacademicoform">Titulo ontenido</label>
                        <input 
                        type="text"
                        value={tituloobtenido || ""}
                        placeholder="Titulo obtenido"
                        onChange={(e) => settituloobtenido(e.target.value)}
                        className="inputsacademico"
                        />
                    </div>
                    <div className="inpustaca">
                        <label htmlFor="" className="textsacademicoform">Institucion Educativa</label>
                        <input 
                        type="text"
                        value={institudionedu || ""}
                        placeholder="Institucion educativa"
                        onChange={(e) => setinstitudionedu(e.target.value)}
                        className="inputsacademico"
                        />
                    </div>
                </div>
                <div className="inputscontdos">
                    <div className="inpustaca">
                        <label htmlFor="" className="textsacademicoform">Fecha de inicio</label>
                        <input 
                        type="date" 
                        value={fechainiciot || ""}
                        placeholder="Fecha de inicio"
                        onChange={(e) => setfechainiciot(e.target.value)}
                        className="inputsacademico"
                        />
                    </div>
                    <div className="inpustaca">
                        <label htmlFor="" className="textsacademicoform">Fecha de culminación</label>
                        <input 
                        type="date"
                        value={fechaculminado || ""}
                        placeholder="Fecha de culminación"
                        onChange={(e) => setfechaculminado(e.target.value)}
                        className="inputsacademico"
                        />
                    </div>
                </div>
                <div className="inputnivel">
                    <div className="inpustaca">
                        <label htmlFor="" className="textsacademicoform">Nivel educativo</label>
                        <input 
                        type="text"
                        value={niveleducativo || ""}
                        placeholder="Nivel educativo"
                        onChange={(e) => setniveleducativo(e.target.value)}
                        className="inputsacademico"
                        />
                    </div>
                </div>
                <button className="btnguardaracademico">Guardar</button>
            </form>
        </div>
        </>
    )
}

export default Academico