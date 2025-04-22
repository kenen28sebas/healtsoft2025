import React, { useState } from "react";

function Buscar ({abrir , token ,children}){
    if (!abrir) return null
    console.log(token.token)
    const [numroid , setnumeroid] = useState("")
    const [hojadevida , sethojadevida] = useState()
    const url = `http://127.0.0.1:8000/consultar/hoja/vida?nro_doc=${numroid}`
    const header = {
        'Content-Type' : 'application/json',
        'Authorization':`Token ${token.token}`
    }
    let id = null
    async function buscar_medico(){
        const respuesta = await fetch(url,{
            method : 'GET',
            headers : header,
        })
        const response = await respuesta.json()
        
        id = response.hoja_vida.id
        console.log(id)
        sethojadevida(response)
        console.log(response)
    }
    return(
        <>
        <div>
        <label htmlFor="">Numero de identificacion</label>
        <input type="text"
        value={numroid}
        onChange={(e)=>{
            setnumeroid(e.target.value)
            console.log(numroid)
        }}
        />
        <button onClick={buscar_medico}>Buscar</button>
        </div>
        {React.cloneElement(children, { token , id , numroid})}
        </>
    )
}
export default Buscar

