import React, { useEffect } from "react";
import { useState } from "react";
import "./formulario_citas.css"
import Alerta from "./alerta";
const Formulario_cita=({token,isOpen,dia,hora,nro_doc,isClose}) => {
    const [prioridad, setPrioridad] = useState(null);
    const [cups, setCups] = useState(null);
    const [medico, setMedico] = useState(null);
    const [paciente, setPaciente] = useState(nro_doc);
    const [listaCups, setListaCups] = useState(null);
    const [listaMedicos , setListaMedicos] = useState(null);
    const [openAlerta , setOpenAlerta] = useState(false)

    console.log(nro_doc == undefined)
    function convertirHora(horaTexto) {
        const [hora, minutos] = horaTexto.match(/\d+/g); // Extraer números
        const esPM = horaTexto.toLowerCase().includes("p. m.");
        let horas24 = parseInt(hora);
    
        if (esPM && horas24 !== 12) {
            horas24 += 12; // Convertir a formato 24 horas
        } else if (!esPM && horas24 === 12) {
            horas24 = 0; // Ajustar las 12 a.m. a medianoche
        }
    
        return { horas: horas24, minutos: parseInt(minutos) };
    }
    function formatearFechaYHora(dia, horaTexto) {
        const { horas, minutos } = convertirHora(horaTexto);


        const fecha = new Date(dia);
        fecha.setHours(horas);
        fecha.setMinutes(minutos);
        fecha.setSeconds(0); 
        
   
        const diaFormateado = String(fecha.getDate()).padStart(2, "0");
        const mesFormateado = String(fecha.getMonth() + 1).padStart(2, "0"); 
        const añoFormateado = fecha.getFullYear(); 
        const horasFormateadas = String(fecha.getHours()).padStart(2, "0"); 
        const minutosFormateados = String(fecha.getMinutes()).padStart(2, "0");
        const segundosFormateados = String(fecha.getSeconds()).padStart(2, "0");
    
        return `${diaFormateado}-${mesFormateado}-${añoFormateado} ${horasFormateadas}:${minutosFormateados}:${segundosFormateados}`;
    }
    const fechaAsignacion= formatearFechaYHora(dia, hora);
    const urlOpcion= () => {
        if (nro_doc == undefined){
            return "http://127.0.0.1:8000/api/cita/"
        }
        if (nro_doc){
            return "http://127.0.0.1:8000/api/citaaux/"
        }
    }
    const url = urlOpcion()
    console.log(url)
    const body = JSON.stringify({
        fecha_de_solicitud : "2025-03-22T14:33:00Z",
        fecha_de_asignacion:fechaAsignacion,
        prioridad: prioridad,
        cups: cups,
        paciente: paciente,
        medico:medico,
        estado: "pendiente"
    }) 
    const header = {
        'Content-Type': 'application/json',
        'Authorization': `Token ${token}`
    }



    const urlListaCups = "http://127.0.0.1:8000/getCups"
    const urlListaMedico = "http://127.0.0.1:8000/getMedico"

    const cargarDatos = async () =>{
        
        const response = await fetch(urlListaCups,{
            method: 'GET',
            headers: header,
        })
        const datos = await response.json()
        setListaCups(datos)
        const response2 = await fetch(urlListaMedico,{
            method: 'GET',
            headers: header,
        })
        const datos2 = await response2.json()
        setListaMedicos(datos2)
    }

    const handleSubmit = async (e) => {
        console.log(body)
        e.preventDefault();
        const response = await fetch(url, {
            method: 'POST',
            headers: header,
            body: body,
          });
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
    
        const data = await response.json();
        setOpenAlerta(true)
          setTimeout(() =>{
            setOpenAlerta(false);
            // cargarCitas()
            isClose()
          }, 2000)
        console.log('Datos obtenidos:', data);
    }
    useEffect(() => {
        cargarDatos();
    }, [])

    if(!isOpen){

        return null
    }
    if(listaCups == null){
        return(
            <>
            <h1>cargado...</h1>
            </>
        )
    }

    const opcionesCups = listaCups.map(cups => <option value={cups.codigo}>{cups.Nombre}</option>)
    const opcionesMedico = listaMedicos.map(medico => <option value={medico.usuario.nro_doc}>{medico.usuario.first_name}</option>)

    return(
        <>
        <div className="formulario_cita">
            <div >
            <form onSubmit={handleSubmit} className="formulario_cita__formulario">
                {/* Select de prioridad */}
                <div className="formulario_cita__cont_input"> 
                    <label htmlFor="prioridad">Prioridad:</label>
                    <select
                    id="prioridad"
                    value={prioridad || ""}
                    onChange={(e) => setPrioridad(e.target.value)}
                    >
                    <option value="">Seleccione una prioridad</option>
                    <option value="Prta">Prioritaria</option>
                    <option value="no">No acordarme</option>
                    </select>
                </div>

                {/* Select de estado */}
                {/* <div>
                    <label htmlFor="estado">Estado:</label>
                    <select
                    id="estado"
                    onChange={(e) => setEstado(e.target.value)}
                    >
                    <option value="">Seleccione un estado</option>
                    <option value="pendiente">Pendiente</option>
                    <option value="confirmada">Confirmada</option>
                    <option value="cancelada">Cancelada</option>
                    </select>
                </div> */}

                {/* Inputs restantes */}
                <div className="formulario_cita__cont_input">
                    <label htmlFor="cups">Cups:</label>
                    <select 
                    id="cups"
                    type="text"
                    value={cups || ""}
                    onChange={(e) => setCups(e.target.value)}>
                    <option value="">Seleccione una Cups</option>
                    {opcionesCups}

                    </select>
                    
                </div>
                <div className="formulario_cita__cont_input">
                    <label htmlFor="medico">Médico:</label>
                    <select 
                    id="medico"
                    type="text"
                    value={medico || ""}
                    onChange={(e) => setMedico(e.target.value)}>
                        <option value="">Seleccione una Medico</option>
                        {opcionesMedico}    
                    </select>
                </div>
                <div className="formulario_cita__cont_input">
                    <label htmlFor="paciente">Paciente:</label>
                    <input
                    id="paciente"
                    type="text"
                    value={paciente || ""}
                    onChange={(e) => setPaciente(e.target.value)}
                    />
                </div>

                <button type="submit">Enviar</button>
                </form>
                <Alerta isOpen={openAlerta}>
                    <h1>Cita creada correctamente</h1>
                </Alerta>
            </div>


        </div>
        </>


    )
}

export default Formulario_cita