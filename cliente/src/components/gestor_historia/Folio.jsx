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
            <div className="modal__content">
                <h1 class="modal__title">Folio</h1>
                <h2 class="modal__subtitle">Paciente ID: {folioData.paciente}</h2>
            
                <div class="modal__section">
                    <h3 className="modal__heading">Anamnesis</h3>
                    <p class="modal__text"><strong>Motivo de Consulta:</strong> {folioData.anamnesis.motivo_consulta}</p>
                    <p class="modal__text"><strong>Inicio de Síntomas:</strong> {folioData.anamnesis.inicio_sintomas}</p>
                    <p class="modal__text"><strong>Síntomas:</strong> {folioData.anamnesis.sintomas}</p>
                    <p class="modal__text"><strong>Alergias:</strong> {folioData.anamnesis.alergias}</p>
                    <p class="modal__text"><strong>Enfermedades Base:</strong> {folioData.anamnesis.enfermedades_base}</p>
                    <p class="modal__text"><strong>Hábitos:</strong> {folioData.anamnesis.habitos}</p>
                    <p class="modal__text"><strong>Examen Físico:</strong> {folioData.anamnesis.examen_fisico}</p>
                </div> 

                <div class="modal__section">
                    <h3  className="modal__heading">Diagnóstico</h3>
                    <p class="modal__text"><strong>CIE10:</strong> {folioData.diagnostico.cie10}</p>
                    <p class="modal__text"><strong>Tipo de Diagnóstico:</strong> {folioData.diagnostico.tipo_diagnostico}</p>
                    <p class="modal__text"><strong>Fecha Diagnóstico:</strong> {folioData.diagnostico.fecha_diagnostico}</p>
                    <p class="modal__text"><strong>Observaciones:</strong> {folioData.diagnostico.observaciones}</p>
                </div>

                <div class="modal__section">
                    <h3>Antecedentes Médicos</h3>
                    <p class="modal__text"><strong>CIE10:</strong> {folioData.antecedentes_medicos.cie10}</p>
                    <p class="modal__text"><strong>Tipo de Diagnóstico:</strong> {folioData.antecedentes_medicos.tipo_diagnostico}</p>
                    <p class="modal__text"><strong>Descripción:</strong> {folioData.antecedentes_medicos.descripcion}</p>
                </div>

                <div class="modal__section">
                    <h3 className="modal__heading">Signos Vitales</h3>
                    <p class="modal__text"><strong>Frecuencia Cardíaca:</strong> {folioData.signos_vitales.frecuencia_cardiaca}</p>
                    <p class="modal__text"><strong>Presión Arterial:</strong> {folioData.signos_vitales.presion_arterial}</p>
                    <p class="modal__text"><strong>Frecuencia Respiratoria:</strong> {folioData.signos_vitales.frecuencia_respiratoria}</p>
                    <p class="modal__text"><strong>Temperatura Corporal:</strong> {folioData.signos_vitales.temperatura_corporal}</p>
                    <p class="modal__text"><strong>Saturación:</strong> {folioData.signos_vitales.saturacion}</p>
                    <p class="modal__text"><strong>Peso:</strong> {folioData.signos_vitales.peso} kg</p>
                    <p class="modal__text"><strong>Talla:</strong> {folioData.signos_vitales.talla} m</p>
                    <p class="modal__text"><strong>IMC:</strong> {folioData.signos_vitales.imc}</p>
                </div>
                <div class="modal__section">
                <h3 className="modal__heading">Paraclínicos</h3>
                    <p class="modal__text"><strong>Resultados:</strong> {folioData.paraclinicos.resultados}</p>
                    <p class="modal__text"><strong>Análisis:</strong> {folioData.paraclinicos.analisis}</p>
                </div>
                <div class="modal__section">
                <h3 className="modal__heading">Orden de Procedimientos</h3>
                    <p class="modal__text"><strong>Código:</strong> {folioData.orden_de_procedimientos.codigo}</p>
                    <p class="modal__text"><strong>CUPS:</strong> {folioData.orden_de_procedimientos.cups}</p>
                    <p class="modal__text"><strong>Descripción:</strong> {folioData.orden_de_procedimientos.descripcion}</p>
                    <p class="modal__text"><strong>Cantidad:</strong> {folioData.orden_de_procedimientos.cantidad}</p>
                    <p class="modal__text"><strong>Estado:</strong> {folioData.orden_de_procedimientos.estado}</p>
                    <p class="modal__text"><strong>Observación:</strong> {folioData.orden_de_procedimientos.observacion}</p>
                </div>
                <div class="modal__section">
                    <h3 className="modal__heading">Fórmula Médica</h3>
                    <p class="modal__text"><strong>Medicamento:</strong> {folioData.formula_medica.medicamento.nombre_medicamento}</p>
                    <p class="modal__text"><strong>Concentración:</strong> {folioData.formula_medica.medicamento.concentracion}</p>
                    <p class="modal__text"><strong>Forma Farmacéutica:</strong> {folioData.formula_medica.medicamento.forma_farmaceutica}</p>
                    <p class="modal__text"><strong>Dosis:</strong> {folioData.formula_medica.medicamento.dosis}</p>
                    <p class="modal__text"><strong>Vía Administración:</strong> {folioData.formula_medica.medicamento.via_administracion}</p>
                    <p class="modal__text"><strong>Frecuencia:</strong> {folioData.formula_medica.medicamento.frecuencia}</p>
                    <p class="modal__text"><strong>Tiempo de Tratamiento:</strong> {folioData.formula_medica.medicamento.tiempo_tratamiento}</p>
                    <p class="modal__text"><strong>Recomendaciones:</strong> {folioData.formula_medica.medicamento.recomendaciones}</p>
                </div>
                <button class="modal__button" onClick={onClose}>Cerrar</button>
            </div>
        </div>
    );
};

export default FolioModal;
