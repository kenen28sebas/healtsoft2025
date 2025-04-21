import React, { useEffect, useState } from "react";
import "./foliomodal.css"; // Asegúrate de crear estilos para la ventana modal

const FolioModal = ({ isOpen, id, nro_doc, token, onClose }) => {
    const [folioData, setFolioData] = useState(null);
    const [loading, setLoading] = useState(true);

    const url = `http://127.0.0.1:8000/historiaclinica/?nro_doc=${nro_doc}`;
    const header = {
        'Content-Type': 'application/json',
        'Authorization': `Token ${token}`
    };

    // Fetch data from the endpoint
    const cargarFolio = async () => {
        try {
            const response = await fetch(url, {
                method: 'GET',
                headers: header
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const datos = await response.json();
            // Filtrar por el índice proporcionado (id)
            const folio = datos.find((item) => item.id === id);
            console
            setFolioData(folio);
            setLoading(false);
        } catch (error) {
            console.error("Error al cargar el folio:", error);
            setLoading(false);
        }
    };

    useEffect(() => {
        if (isOpen) {
            cargarFolio();
        }
    }, [isOpen, id, nro_doc]);

    if (!isOpen) {
        return null;
    }

    if (loading) {
        return (
            <div className="modal">
                <div className="modal-content">
                    <h1>Cargando folio...</h1>
                    <button onClick={onClose}>Cerrar</button>
                </div>
            </div>
        );
    }

    if (!folioData) {
        return (
            <div className="modal">
                <div className="modal-content">
                    <h1>No se encontró el folio.</h1>
                    <button onClick={onClose}>Cerrar</button>
                </div>
            </div>
        );
    }

    return (
        <div className="modal">
            <div className="modal-content">
                <h1>Folio</h1>
                <h2>Paciente ID: {folioData.paciente}</h2>

                <h3>Anamnesis</h3>
                <p><strong>Motivo de Consulta:</strong> {folioData.anamnesis.motivo_consulta}</p>
                <p><strong>Inicio de Síntomas:</strong> {folioData.anamnesis.inicio_sintomas}</p>
                <p><strong>Síntomas:</strong> {folioData.anamnesis.sintomas}</p>
                <p><strong>Alergias:</strong> {folioData.anamnesis.alergias}</p>
                <p><strong>Enfermedades Base:</strong> {folioData.anamnesis.enfermedades_base}</p>
                <p><strong>Hábitos:</strong> {folioData.anamnesis.habitos}</p>
                <p><strong>Examen Físico:</strong> {folioData.anamnesis.examen_fisico}</p>

                <h3>Diagnóstico</h3>
                <p><strong>CIE10:</strong> {folioData.diagnostico.cie10}</p>
                <p><strong>Tipo de Diagnóstico:</strong> {folioData.diagnostico.tipo_diagnostico}</p>
                <p><strong>Fecha Diagnóstico:</strong> {folioData.diagnostico.fecha_diagnostico}</p>
                <p><strong>Observaciones:</strong> {folioData.diagnostico.observaciones}</p>

                <h3>Antecedentes Médicos</h3>
                <p><strong>CIE10:</strong> {folioData.antecedentes_medicos.cie10}</p>
                <p><strong>Tipo de Diagnóstico:</strong> {folioData.antecedentes_medicos.tipo_diagnostico}</p>
                <p><strong>Descripción:</strong> {folioData.antecedentes_medicos.descripcion}</p>

                <h3>Signos Vitales</h3>
                <p><strong>Frecuencia Cardíaca:</strong> {folioData.signos_vitales.frecuencia_cardiaca}</p>
                <p><strong>Presión Arterial:</strong> {folioData.signos_vitales.presion_arterial}</p>
                <p><strong>Frecuencia Respiratoria:</strong> {folioData.signos_vitales.frecuencia_respiratoria}</p>
                <p><strong>Temperatura Corporal:</strong> {folioData.signos_vitales.temperatura_corporal}</p>
                <p><strong>Saturación:</strong> {folioData.signos_vitales.saturacion}</p>
                <p><strong>Peso:</strong> {folioData.signos_vitales.peso} kg</p>
                <p><strong>Talla:</strong> {folioData.signos_vitales.talla} m</p>
                <p><strong>IMC:</strong> {folioData.signos_vitales.imc}</p>

                <h3>Paraclínicos</h3>
                <p><strong>Resultados:</strong> {folioData.paraclinicos.resultados}</p>
                <p><strong>Análisis:</strong> {folioData.paraclinicos.analisis}</p>

                <h3>Orden de Procedimientos</h3>
                <p><strong>Código:</strong> {folioData.orden_de_procedimientos.codigo}</p>
                <p><strong>CUPS:</strong> {folioData.orden_de_procedimientos.cups}</p>
                <p><strong>Descripción:</strong> {folioData.orden_de_procedimientos.descripcion}</p>
                <p><strong>Cantidad:</strong> {folioData.orden_de_procedimientos.cantidad}</p>
                <p><strong>Estado:</strong> {folioData.orden_de_procedimientos.estado}</p>
                <p><strong>Observación:</strong> {folioData.orden_de_procedimientos.observacion}</p>

                <h3>Fórmula Médica</h3>
                <p><strong>Medicamento:</strong> {folioData.formula_medica.medicamento.nombre_medicamento}</p>
                <p><strong>Concentración:</strong> {folioData.formula_medica.medicamento.concentracion}</p>
                <p><strong>Forma Farmacéutica:</strong> {folioData.formula_medica.medicamento.forma_farmaceutica}</p>
                <p><strong>Dosis:</strong> {folioData.formula_medica.medicamento.dosis}</p>
                <p><strong>Vía Administración:</strong> {folioData.formula_medica.medicamento.via_administracion}</p>
                <p><strong>Frecuencia:</strong> {folioData.formula_medica.medicamento.frecuencia}</p>
                <p><strong>Tiempo de Tratamiento:</strong> {folioData.formula_medica.medicamento.tiempo_tratamiento}</p>
                <p><strong>Recomendaciones:</strong> {folioData.formula_medica.medicamento.recomendaciones}</p>

                <button onClick={onClose}>Cerrar</button>
            </div>
        </div>
    );
};

export default FolioModal;
