import { useEffect, useState } from "react"
import NavBarTH from "./NavBarTH"
import GestionarHv from "./Gestionarhv"
import CrearHv from "./CrearHv"


const AppGestorTh = (token) => {
    const [opcion,setopcion] = useState (false)
    const [estado,setestado] = useState (true)
    function Cambiarestado(){
        setopcion(true)
        setestado(true)
    }
    
    function cambiarestado2 (){
        setestado(false)
        setopcion(false)
    }
    const [datos , setDatos] = useState (null)
    const url = "http://127.0.0.1:8000/perfil"
    const header = {
        'Content-Type' : 'aplication/json',
        'Authorization' : `Token ${token.token}`
    }
    const cargarDatos = async () =>{
        try{
            const response = await fetch(url,
                {
                    method : 'POST',
                    headers : header

                }
            );
            if(!response.ok){
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            setDatos(data)
            console.log('Datos obtenidos:',data);
            console.log(data.user.usuario.nro_doc)
        }catch (err){
            console.log('error al realizar el fetch:',err);
        }
    }
    useEffect(() => {
        cargarDatos();
    },[]);
    if(datos == null){
        return(
            <h1> jijiji nopio -.-</h1>
        )
    }
    return(
        <>
        <NavBarTH funcion={Cambiarestado} funcion2={cambiarestado2} nombreuser={datos.user.usuario.username}/>
        <GestionarHv isOpen={opcion} isClose={estado} token={token} nro_doc_auxiliar={datos.user.id}/>
        {/* <h1>{datos.user.usuario.username}</h1> */}
        </>
    )
}

export default AppGestorTh