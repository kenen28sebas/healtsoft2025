import React, { useEffect, useState } from "react";
// import "./listahistoriaclinica.css";
import FolioModal from "./Folio";

const ListaHistoriaClinica = ({ isOpen, token, nro_doc }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [idFolio , setIdFolio] = useState(null)
    const [historiaClinica, setHistoriaClinica] = useState([]);

    const url = `http://127.0.0.1:8000/historiaclinica/?nro_doc=${nro_doc}`;
    const header = {
        'Content-Type': 'application/json',
        'Authorization': `Token ${token}`,
    };

    // Cargar la historia clínica desde el backend
    const cargarHistoriaClinica = async () => {
        try {
            const response = await fetch(url, {
                method: 'GET',
                headers: header,
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const datos = await response.json();
            setHistoriaClinica(datos);
            console.log(datos);
        } catch (error) {
            console.error("Error al cargar la historia clínica:", error);
        }
    };

    const handleOpenModal = (consulta) => {
        setIsModalOpen(true);
        setIdFolio(consulta.id)
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    useEffect(() => {
        cargarHistoriaClinica();
    }, []); // Se ejecuta al montar el componente

    // Verificaciones de estado
    if (!historiaClinica) {
        console.log("No se encontró la historia clínica");
        return <h1>Cargando historia clínica...</h1>;
    }

    if (historiaClinica.length === 0) {
        console.log("Sin datos de historia clínica disponibles");
        return <h1>No hay datos disponibles</h1>;
    }

    // Mapeo de la historia clínica en filas para la tabla
    const filasHistoriaClinica = historiaClinica.map((consulta) => (
        <tr key={consulta.id}>
            <td>{consulta.anamnesis.inicio_sintomas}</td>
            <td>{consulta.diagnostico.tipo_diagnostico}</td>
            <td>{consulta.anamnesis.motivo_consulta}</td>
            <td>{consulta.diagnostico.cie10_detalle.nombre_cie10}</td>
            <td>
                <button onClick={() => {handleOpenModal(consulta)} }>
                    Ver Folio
                </button>
            </td>
        </tr>
    ));

    // Renderizado del componente
    return (
        <>
            <div className="styled-table">
                <table>
                    <thead>
                        <tr>
                            <th>Fecha de Consulta</th>
                            <th>Tipo</th>
                            <th>Motivo de Consulta</th>
                            <th>CIE10</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>{filasHistoriaClinica}</tbody>
                </table>
            </div>
            <FolioModal
                isOpen={isModalOpen}
                id={idFolio}
                nro_doc = {nro_doc}
                token={token}
                onClose={handleCloseModal}
            />
        </>
    );
};

export default ListaHistoriaClinica;
