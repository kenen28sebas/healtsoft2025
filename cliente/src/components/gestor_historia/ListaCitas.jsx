import React, { useEffect, useState } from "react";
import Alerta from "../gestor_citas/alerta";
import "./listacitas.css"

const ListaCitasMedico = ({ isOpen, token, nro_doc_medico }) => {
    if (!isOpen) return null;

    const [citas, setCitas] = useState([]);
    const [openAlerta, setOpenAlerta] = useState(false);

    const url = `http://127.0.0.1:8000/api/citaaux/?nro_doc_medico=${nro_doc_medico}`;
    const header = {
        'Content-Type': 'application/json',
        'Authorization': `Token ${token}`,
    };

    // Cargar las citas desde el backend
    const cargarCitas = async () => {
        try {
            const response = await fetch(url, {
                method: 'GET',
                headers: header,
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const datos = await response.json();
            setCitas(datos);
            console.log(datos);
        } catch (error) {
            console.error("Error al cargar las citas:", error);
        }
    };

    

    useEffect(() => {
        cargarCitas();
    }, []); // Solo se ejecuta una vez al montar el componente

    // Verificaciones de estado
    if (!citas) {
        console.log("No se encontraron citas");
        return <h1>Cargando citas...</h1>;
    }

    if (citas.length === 0) {
        console.log("Sin citas disponibles");
        return <h1>No hay citas disponibles</h1>;
    }

    // Mapeo de las citas en filas para la tabla
    const filasCitas = citas.map((cita) => (
        <tr className="styled-table__cell"key={cita.id}>
            <td className="styled-table__cell">{cita.fecha_de_solicitud}</td>
            <td className="styled-table__cell">{cita.fecha_de_asignacion}</td>
            <td className="styled-table__cell">{cita.prioridad}</td>
            <td className="styled-table__cell">{cita.cups}</td>
            <td className="styled-table__cell">{cita.paciente.usuario.first_name}</td>
            <td className="styled-table__cell">{cita.medico.usuario.first_name}</td>
            <td className="styled-table__cell">{cita.estado}</td>
            <td>
                <button className="styled-table__button styled-table__button--update">Actualizar</button>
            </td>
        </tr>
    ));

    // Renderizado del componente
    return (
        <>
            <div className="styled-table">
                <table className="styled-table__table">
                    <thead className="styled-table__header">
                        <tr className="styled-table__row">
                            <th className="styled-table__cell">Fecha de Solicitud</th>
                            <th className="styled-table__cell">Fecha de Asignación</th>
                            <th className="styled-table__cell">Prioridad</th>
                            <th className="styled-table__cell">CUPS</th>
                            <th className="styled-table__cell">Paciente</th>
                            <th className="styled-table__cell">Médico</th>
                            <th className="styled-table__cell">Estado</th>
                            <th className="styled-table__cell">Acciones</th>
                        </tr>
                    </thead>
                    <tbody className="styled-table__body">{filasCitas}</tbody>
                </table>
                {/* <Alerta isOpen={openAlerta}>
                    <h1>Cita eliminada correctamente</h1>
                </Alerta> */}
            </div>
        </>
    );
};

export default ListaCitasMedico;
