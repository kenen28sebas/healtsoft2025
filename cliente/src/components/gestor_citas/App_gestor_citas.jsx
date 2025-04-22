import React from "react";
import Navbar from "./Navbar"
import { useState , useEffect } from "react";
import Registro from '../registro'
import Login from '../login'
import Overlay from '../overley'
import { ContenedorNombre } from "./ContenedorNombre";
import Nabvar from "./Navbar";
import './app_gestor_citas.css'
import Contenedor_opciones from "./Contenedor_opciones";
import Calendario_citas from "./calendario_citas";
import ListaCitas from "./ListaCitas";
import BuscarPaciente from "./BuscarPaciente";
import FormularioPaciente from "./FormularioPaciente";

const App_gestor_citas = ({token}) =>{
    const [listabotones,setListabotones] = useState([])
    const [isOpenCalendario ,setIsOpenCalendario] = useState(false)
    const [isOpenConsulatr ,setIsOpenConsulatr] = useState(false)
    const [isOpeninfoPaciente ,setIsOpeninfoPaciente] = useState(false)
    const [isOpencrearPaciente ,setIsOpencrearPaciente] = useState(false)

    const [datos,setDatos] = useState(null)
    const url = "http://127.0.0.1:8000/perfil"
    const header = {
        'Content-Type': 'application/json',
        'Authorization': `Token ${token}`
    }
    const cargarDatos = async () =>{
        try {
            const response = await fetch(url, 
                {
                    method  : "POST",
                    headers : header
                }
            );
      
            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
            }
      
            const data = await response.json();
            setDatos(data)

            console.log('Datos obtenidos:', data);
            switch(data.tipo_usuario){
              case "paciente":
                setListabotones([{id:1,titulo :"crear cita"},{id:2,titulo :"consultar cita"}]) 
                break;
              case "auxiliar":
                setListabotones( [{id:1,titulo :"crear cita"},{id:2,titulo :"consultar cita"},{id:3,titulo :"consultar paciente"},{id:4,titulo :"crear paciente"}]) 
                break;
            } 

            // almacenarTokenp.almacenarTokenp(data.token)
            
          } catch (err) {
            // setError(err.message);
            console.error('Error al realizar el fetch:', err);
          }
    }
    const cerrarVentanas = (abierta) => {
      switch(abierta){
        case "crear cita":
          setIsOpenConsulatr(false)
          setIsOpenCalendario(true)
          setIsOpencrearPaciente(false)
          setIsOpeninfoPaciente(false)
          break;   
        case "consultar cita":
          setIsOpenConsulatr(true)
          setIsOpenCalendario(false)
          setIsOpencrearPaciente(false)
          setIsOpeninfoPaciente(false)
          break;   
        case "consultar paciente":
          setIsOpenConsulatr(false)
          setIsOpenCalendario(false)
          setIsOpencrearPaciente(false)
          setIsOpeninfoPaciente(true)
          break;
        case "crear paciente":
          setIsOpenConsulatr(false)
          setIsOpenCalendario(false)
          setIsOpencrearPaciente(true)
          setIsOpeninfoPaciente(false)
          break;            
      }

    };
    useEffect(() => {
        cargarDatos();
      }, []);
    
    if(datos == null){
      return(
        <h1>nopi jijiji</h1>
      )
    }
    if(datos.tipo_usuario == "auxiliar"){
      return(
        <>
        <div className="cuerpo_app">
        <Nabvar>
          <ContenedorNombre nombre={`${datos.user.usuario.first_name} ${datos.user.usuario.last_name}`} rol={"Auxiliar administrativo"}></ContenedorNombre>
          <Contenedor_opciones lista={listabotones} closeOther={cerrarVentanas}></Contenedor_opciones>
        </Nabvar>
        <div className="contenido">
          <BuscarPaciente isOpen={isOpenCalendario}  token = {token} tipo={"agendar"} isLock={false}>
            <Calendario_citas isOpen={isOpenCalendario} token={token}></Calendario_citas>
        </BuscarPaciente>
        <BuscarPaciente isOpen={isOpenConsulatr}  token = {token} tipo={"consultar citas"} isLock={false}> 
            <ListaCitas isOpen={isOpenConsulatr} token={token}></ListaCitas>
        </BuscarPaciente>
        <FormularioPaciente isOpen={isOpencrearPaciente} ></FormularioPaciente>
        <BuscarPaciente isOpen={isOpeninfoPaciente}  token = {token} tipo={"ver informacion"} isLock={true}>
        </BuscarPaciente>
        </div>
        
        </div>
        </>

      )
      


    }
    return(
        <>
        <Nabvar>
          <ContenedorNombre nombre={`${datos.user.usuario.first_name} ${datos.user.usuario.last_name}`} rol={"Paciente"}></ContenedorNombre>
          <Contenedor_opciones lista={listabotones} closeOther={cerrarVentanas}></Contenedor_opciones>
        </Nabvar>
        <Calendario_citas isOpen={isOpenCalendario} token={token}></Calendario_citas>
        <ListaCitas isOpen={isOpenConsulatr} token={token}></ListaCitas>
        </>
        
    )

}

export default App_gestor_citas