import React from "react";
import { useState } from "react";

const Formulario_cita=({token,isOpen,dia,hora}) => {
    const [prioridad, setPrioridad] = useState(null);
    const [cups, setCups] = useState(null);
    const [medico, setMedico] = useState(null);
    const [paciente, setPaciente] = useState(null);

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
    const url = "http://127.0.0.1:8000/api/cita/"
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

    if(!isOpen){

        return null
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch(url, {
            method: 'POST', // Si el endpoint requiere un POST
            headers: header,
            body: body,
          });
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
    
        const data = await response.json();
        
        console.log('Datos obtenidos:', data);
    }



    return(
        <>
        <div>
            <div>
            <form onSubmit={handleSubmit}>
                {/* Select de prioridad */}
                <div>
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
                <div>
                    <label htmlFor="cups">Cups:</label>
                    <input
                    id="cups"
                    type="text"
                    value={cups || ""}
                    onChange={(e) => setCups(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="medico">Médico:</label>
                    <input
                    id="medico"
                    type="text"
                    value={medico || ""}
                    onChange={(e) => setMedico(e.target.value)}
                    />
                </div>
                <div>
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

            </div>


        </div>
        </>


    )
}

export default Formulario_cita