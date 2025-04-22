import React, { useEffect, useState } from 'react';
import Nabvar from '../gestor_citas/Navbar';
// import ContenedorNombre from './components/ContenedorNombre';
// import CalendarioCitas from './components/CalendarioCitas';
// import ListaCitas from './components/ListaCitas';
import { ContenedorNombre } from '../gestor_citas/ContenedorNombre';
import Contenedor_opciones from '../gestor_citas/Contenedor_opciones';
import BuscarPaciente from '../gestor_citas/BuscarPaciente';
import CrearHv from './CrearHc';
import ListaCitasMedico from './ListaCitas';
import ListaHistoriaClinica from './ListaFolios';


const AppHistoriaClinica = ({  token }) => {
    const [listabotones, setListabotones] = useState([
        { id: 1, titulo: "crear hc" },
        { id: 2, titulo: "consultar citas" },
        { id: 3, titulo: "consultar paciente" },
    ]);

    
    const [isOpenCrearhc, setIsOpenCrearhc] = useState(false);
    const [isOpenConsultar, setIsOpenConsultar] = useState(false);
    const [isOpenPaciente, setIsOpenPaciente] = useState(false);
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
                setIsOpenPaciente(false);
                break;
            case "consultar citas":
                setIsOpenConsultar(true);
                setIsOpenCrearhc(false);
                setIsOpenPaciente(false);
                break;
            case "consultar paciente":
                setIsOpenConsultar(false);
                setIsOpenCrearhc(false);
                setIsOpenPaciente(true);
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
            <div style={{
                display: 'flex',
                height: '100vh',
                fontFamily: "'Poppins', sans-serif",
              }
            }>
            <Nabvar>
                <ContenedorNombre nombre={`${datos.user.usuario.first_name} ${datos.user.usuario.last_name}`} rol={"Medico"}></ContenedorNombre>
                <Contenedor_opciones lista={listabotones} closeOther={cerrarVentanas}></Contenedor_opciones>
            </Nabvar>
            <BuscarPaciente isOpen={isOpenCrearhc}  token={token} tipo={"crear nuevo folio"} isLock={false} userid={datos.user.id}>
                <CrearHv></CrearHv>
            </BuscarPaciente>
            <ListaCitasMedico isOpen={isOpenConsultar} token={token} nro_doc_medico={datos.user.id}></ListaCitasMedico>
            <BuscarPaciente isOpen={isOpenPaciente}  token={token} tipo={"crear nuevo folio"} isLock={false} >
                <ListaHistoriaClinica></ListaHistoriaClinica>
            </BuscarPaciente>
            {/* 
            <ListaCitas isOpen={isOpenConsultar} token={token} /> */}
            </div>
        </>
    );
};

export default AppHistoriaClinica;
