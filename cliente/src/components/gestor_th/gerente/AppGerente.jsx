import React, { useEffect, useState } from "react";
import NavBarGerente from "./NavBarGerente";
import GestionarIps from "./GestionarIps";

const AppGerente = (token) => {
    const [opcion,setopcion] = useState(false)
    const [estado,setestado] = useState(true)
    function Cambiarestado(){
        setopcion(true)
        setestado(true)
    }
    function cambiarestado2 (){
        setestado(false)
        setopcion(false)
    }
    const [datos , setDatos] = useState (null)
    const url = 'http://127.0.0.1:8000/perfil'
    const header ={
        'Content-Type' : 'application/json',
        'Authorization' : `Token ${token.token}`
    }
    const cargarDatos = async () =>{
        try{
            const respuesta = await fetch(url,{
                method :'POST',
                headers : header
            });
            if (!respuesta.ok){
                throw new Error(`HTTP error! status: ${respuesta.status}`);
            }
            const data = await respuesta.json();
            setDatos(data)
            console.log('Datos obtenidos:',data);
            console.log(data.user.usuario.nro_doc)
        } catch (err){
            console.log('error al realizar el fetch:',err);
        }
    }
    useEffect(() =>{
        cargarDatos();
    },[]);
    if (datos == null){
        return(
            <h1>Jijiji Nopo -.-</h1>
        )
    }
    return(
        <>
        <div className="gestionips">
            <NavBarGerente funcionabrir={Cambiarestado} funcioncerrar={cambiarestado2}/>
            <GestionarIps abrirOpciones={opcion} cerrarOpciones={estado} token={token}/>
        </div>
        </>
    )

}
export default AppGerente


