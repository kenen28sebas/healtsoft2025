import React from "react";
import CrearHv from "./CrearHv";

function ActualizarHv ({token}){

    const ruta = 'http://127.0.0.1:8000/actualizar/hv/'
    const header = {
        'Content-Type' : 'application/json',
        'Authorization':`Token ${token.token}`
    }
    // const bodyac = JSON.stringify({
    //     tipo_usuario : "medico",
    //     especialidad : especialidad,
    //     contrato : contrato,
    //     sueldo : sueldo,
    //     cargo:cargo,
    //     usuario: {
    //         password : password,
    //         lugar_exp_doc : lugarexp,
    //         fecha_exp_doc : fechaexpt,
    //         estado_civil : estadocv,
    //         telefono : telefono,
    //         nacionalidad : nacionalidad,
    //         municipio : municipio,
    //         username:username,
    //     },
    // })

    const handleSubmit = async (a) =>{
        a.preventDefault();
        const respuesta = await fetch (ruta,{
            method : 'PATCH',
            headers : header,
            // body : bodyac,
        });
        if (!respuesta.ok){
            throw new Error(`error : ${respuesta.status}`);
        }
        const datos = await respuesta.json();
        console.log('datos obtenidos:',datos)
        console.log(body)
    }
    return(
        <>
        <CrearHv></CrearHv>
        </>
    )
}

export default ActualizarHv