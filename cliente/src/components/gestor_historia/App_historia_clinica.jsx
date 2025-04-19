import React, { useEffect, useState } from 'react';
import Nabvar from '../gestor_citas/Navbar';
// import ContenedorNombre from './components/ContenedorNombre';
// import CalendarioCitas from './components/CalendarioCitas';
// import ListaCitas from './components/ListaCitas';
import { ContenedorNombre } from '../gestor_citas/ContenedorNombre';
import Contenedor_opciones from '../gestor_citas/Contenedor_opciones';
import BuscarPaciente from '../gestor_citas/BuscarPaciente';


const AppHistoriaClinica = ({  token }) => {
    const [listabotones, setListabotones] = useState([
        { id: 1, titulo: "crear hc" },
        { id: 2, titulo: "consultar cita" },
        { id: 3, titulo: "consultar paciente" },
        { id: 4, titulo: "crear paciente" }
    ]);


    const [isOpenCrearhc, setIsOpenCrearhc] = useState(false);
    const [isOpenConsultar, setIsOpenConsultar] = useState(false);
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
    
                // almacenarTokenp.almacenarTokenp(data.token)
                
              } catch (err) {
                // setError(err.message);
                console.error('Error al realizar el fetch:', err);
              }
        }

    useEffect(() => {
        cargarDatos();
      }, []);
    
    if(datos == null){
      return(
        <h1>nopi jijiji</h1>
      )
    }
        
    const cerrarVentanas = (abierta) => {
        switch (abierta) {
            case "crear hc":
                setIsOpenConsultar(false);
                setIsOpenCrearhc(true);
                break;
            case "consultar cita":
                setIsOpenConsultar(true);
                setIsOpenCrearhc(false);
                break;
            case "consultar paciente":
                setIsOpenConsultar(false);
                setIsOpenCrearhc(false);
                break;
            case "crear paciente":
                setIsOpenConsultar(false);
                setIsOpenCrearhc(false);
                break;
            default:
                break;
        }
    };
    return (
        <>
            <Nabvar>
                <ContenedorNombre nombre={`${datos.user.usuario.first_name} ${datos.user.usuario.last_name}`} rol={"Medico"}></ContenedorNombre>
                <Contenedor_opciones lista={listabotones} closeOther={cerrarVentanas}></Contenedor_opciones>
            </Nabvar>
            <BuscarPaciente isOpen={isOpenCrearhc}  token = {token} tipo={"crear nuevo folio"} isLock={false}>
                
            </BuscarPaciente>
            {/* 
            <ListaCitas isOpen={isOpenConsultar} token={token} /> */}
        </>
    );
};

export default AppHistoriaClinica;
