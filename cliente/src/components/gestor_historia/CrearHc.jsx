import React, { useState ,useEffect} from "react";
import "./CrearHc.css"
import Alerta from "../gestor_citas/alerta";

const CrearHv= ({nro_doc,userId,token,isOpen}) => {
    const [isOpenr,setIsOpen] = useState(isOpen)
    if(!isOpenr){return null}
    const [nroDoc, setNroDoc] = useState(null)
    const [openAlerta, setOpenAlerta] = useState(false);
    const [listaCie10 , setListaCie10] = useState(null)
    const [listaCups, setListaCups] = useState(null);
    const [isOpenAnamnesis , setIsOpenAnamnesis] = useState(false)
    const [anamnesis, setAnamnesis] = useState({
        motivo_consulta: "",
        inicio_sintomas: "", 
        sintomas: "",
        alergias: "",
        enfermedades_base: "",
        habitos: "",
        examen_fisico: "",
    });
    const [isOpenDiagnostico, setIsOpenDiagnostico] = useState(false);
    const [diagnostico, setDiagnostico] = useState({
        cie10: "",
        tipo_diagnostico: "",
        fecha_diagnostico: "",
        observaciones: "",
    });
    const [isOpenAntecedentesMedicos, setIsOpenAntecedentesMedicos] = useState(false);
    const [antecedentesMedicos, setAntecedentesMedicos] = useState({
        cie10: "",
        tipo_diagnostico: "",
        descripcion: "",
    });
    const [isOpenSignosVitales, setIsOpenSignosVitales] = useState(false);
    const [signosVitales, setSignosVitales] = useState({
        frecuencia_cardiaca: "",
        presion_arterial: "",
        frecuencia_respiratoria: "",
        temperatura_corporal: "",
        saturacion: "",
        peso: "",
        talla: "",
        imc: "",
    });
    const [isOpenParaclinicos, setIsOpenParaclinicos] = useState(false);
    const [paraclinicos, setParaclinicos] = useState({
        resultados: "",
        analisis: "",
    });
    const [isOpenOrdenProcedimientos, setIsOpenOrdenProcedimientos] = useState(false);
    const [ordenDeProcedimientos, setOrdenDeProcedimientos] = useState({
        codigo: "",
        cups: "",
        descripcion: "",
        cantidad: "",
        estado: "",
        observacion: "",
    });
    const [isOpenFormulaMedica, setIsOpenFormulaMedica] = useState(false);
    const [formulaMedica, setFormulaMedica] = useState({
        medicamento: {
            nombre_medicamento: "",
            concentracion: "",
            forma_farmaceutica: "",
            dosis: "",
            via_administracion: "",
            frecuencia: "",
            tiempo_tratamiento: "",
            cantidad: "",
            cantidad_letras: "",
            posologia: "",
            recomendaciones: "",
        },
        medico: userId, // Campo fijo
        diagnostico: {}, // Campo anidado
    });
    const [isOpenEvolucion, setIsOpenEvolucion] = useState(false);
    const [evolucion, setEvolucion] = useState({
        medico: userId, // Campo fijo
        diagnostico: diagnostico, // Campo anidado
        plan_de_manejo: "",
        evolucion: "",
        recomendaciones: "",
        interconsultas: "",
        plan_de_seguimiento: "",
    });



    let formData = {
        paciente: nroDoc,
        anamnesis: anamnesis,
        diagnostico: diagnostico,
        antecedentes_medicos: antecedentesMedicos,
        signos_vitales: signosVitales,
        paraclinicos: paraclinicos,
        orden_de_procedimientos: ordenDeProcedimientos,
        formula_medica: formulaMedica,
        evolucion: evolucion,
        medico: userId
    }
     

    function x (){
        console.log(formData)
    }

    const header = {
        'Content-Type': 'application/json',
        'Authorization': `Token ${token}`
    }

    const url = 'http://127.0.0.1:8000/historiaclinica/'
    async function crearFolio (){
        console.log(JSON.stringify(formData))
        try {
            const response = await fetch(url, {
              method: "POST",
              headers: header,
              body: JSON.stringify(formData),
            });
      
            
            if (response.ok) {
                console.log("se guardo siuuuu")
              setOpenAlerta(true);
              setTimeout(() => setOpenAlerta(false), 3000);
              setIsOpen(false) 
              
            } else {
                alert("debes llenar todos los campos")
              console.error("Error en el registro.");
            }
          } catch (error) {
            console.error("Error en la solicitud:", error);
          }
        
    }

    const handlesOpenAnamnesis = () => {
        setIsOpenAnamnesis(true);
        setIsOpenDiagnostico(false);
        setIsOpenAntecedentesMedicos(false);
        setIsOpenSignosVitales(false);
        setIsOpenParaclinicos(false);
        setIsOpenOrdenProcedimientos(false);
        setIsOpenFormulaMedica(false);
        setIsOpenEvolucion(false);
    };

    const handleOpenDiagnostico = () => {
        setIsOpenAnamnesis(false);
        setIsOpenDiagnostico(true);
        setIsOpenAntecedentesMedicos(false);
        setIsOpenSignosVitales(false);
        setIsOpenParaclinicos(false);
        setIsOpenOrdenProcedimientos(false);
        setIsOpenFormulaMedica(false);
        setIsOpenEvolucion(false);
    };

    const handleOpenAntecedentesMedicos = () => {
        setIsOpenAnamnesis(false);
        setIsOpenDiagnostico(false);
        setIsOpenAntecedentesMedicos(true);
        setIsOpenSignosVitales(false);
        setIsOpenParaclinicos(false);
        setIsOpenOrdenProcedimientos(false);
        setIsOpenFormulaMedica(false);
        setIsOpenEvolucion(false);
    };

    const handleOpenSignosVitales = () => {
        setIsOpenAnamnesis(false);
        setIsOpenDiagnostico(false);
        setIsOpenAntecedentesMedicos(false);
        setIsOpenSignosVitales(true);
        setIsOpenParaclinicos(false);
        setIsOpenOrdenProcedimientos(false);
        setIsOpenFormulaMedica(false);
        setIsOpenEvolucion(false);
    };
    const handleOpenParaclinicos = () => {
        setIsOpenAnamnesis(false);
        setIsOpenDiagnostico(false);
        setIsOpenAntecedentesMedicos(false);
        setIsOpenSignosVitales(false);
        setIsOpenParaclinicos(true);
        setIsOpenOrdenProcedimientos(false);
        setIsOpenFormulaMedica(false);
        setIsOpenEvolucion(false);
    };
    const handleOpenOrdenProcedimientos = () => {
        setIsOpenAnamnesis(false);
        setIsOpenDiagnostico(false);
        setIsOpenAntecedentesMedicos(false);
        setIsOpenSignosVitales(false);
        setIsOpenParaclinicos(false);
        setIsOpenOrdenProcedimientos(true);
        setIsOpenFormulaMedica(false);
        setIsOpenEvolucion(false);
    };
    const handleOpenFormulaMedica = () => {
        setIsOpenAnamnesis(false);
        setIsOpenDiagnostico(false);
        setIsOpenAntecedentesMedicos(false);
        setIsOpenSignosVitales(false);
        setIsOpenParaclinicos(false);
        setIsOpenOrdenProcedimientos(false);
        setIsOpenFormulaMedica(true);
        setIsOpenEvolucion(false);
    };
    const handleOpenEvolucion = () => {
        setIsOpenAnamnesis(false);
        setIsOpenDiagnostico(false);
        setIsOpenAntecedentesMedicos(false);
        setIsOpenSignosVitales(false);
        setIsOpenParaclinicos(false);
        setIsOpenOrdenProcedimientos(false);
        setIsOpenFormulaMedica(false);
        setIsOpenEvolucion(true);
    };


    const handleChangeEvolucion = (e) => {
        const { name, value } = e.target;
        setEvolucion({
            ...evolucion,
            [name]: value,
        });
        console.log(evolucion);
    };

    const handleChangeOrdenProcedimientos = (e) => {
        const { name, value } = e.target;
        setOrdenDeProcedimientos({ ...ordenDeProcedimientos, [name]: value });
        console.log(ordenDeProcedimientos);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setAnamnesis({ ...anamnesis, [name]: value });
        console.log(anamnesis)
    };

    const handleChangeDiagnostico = (e) => {
        const { name, value } = e.target;
        setDiagnostico({ ...diagnostico, [name]: value });
        console.log(diagnostico);
    };

    const handleChangeAntecedentesMedicos = (e) => {
        const { name, value } = e.target;
        setAntecedentesMedicos({ ...antecedentesMedicos, [name]: value });
        console.log(antecedentesMedicos);
    };

    const handleChangeSignosVitales = (e) => {
        const { name, value } = e.target;
        setSignosVitales({ ...signosVitales, [name]: value });
        console.log(signosVitales);
    };
    const handleChangeParaclinicos = (e) => {
        const { name, value } = e.target;
        setParaclinicos({ ...paraclinicos, [name]: value });
        console.log(paraclinicos);
    };

    const handleChangeFormulaMedica = (e) => {
        const { name, value } = e.target;
        setFormulaMedica({
            ...formulaMedica,
            medicamento: { ...formulaMedica.medicamento, [name]: value },
        });
        console.log(formulaMedica);
    };
    const urlListaCups = "http://127.0.0.1:8000/getCups"
    const urlCie10 = "http://127.0.0.1:8000/cie10/"
    const urlPaciente = `http://127.0.0.1:8000/getPaciente/${nro_doc}/`
    const cargarDatos = async () =>{
        const response = await fetch(urlListaCups,{
            method: 'GET',
            headers: header,
        })
        console.log(response)
        const datos = await response.json()
        setListaCups(datos)
        const response2 = await fetch(urlCie10,{
            method: 'GET',
            headers: header,
        })
        const datos2 = await response2.json()
        setListaCie10(datos2)
        const response3 = await fetch(urlPaciente,{
            method: 'GET',
            headers: header,
        })
        const datos3 = await response3.json()
        setNroDoc(datos3.datos.id)
    }
    useEffect(() => {
            cargarDatos();
        }, [])
    useEffect(() => {
        setFormulaMedica((prevState) => ({
            ...prevState,
            diagnostico: diagnostico,
        }));
    }, [diagnostico]);
    useEffect(() => {
        setEvolucion((prevState) => ({
            ...prevState,
            diagnostico: diagnostico, 
        }));
    }, [diagnostico]); 
    if(listaCups == null){
        return(
            <>
            <h1>cargado...</h1>
            </>
        )
    }
    if(listaCie10 == null){
        return(
            <>
            <h1>cargado...</h1>
            </>
        )
    }
    const opcionesCie10= listaCie10.map(cups => <option value={cups.codigo_cie10}>{cups.nombre_cie10}</option>)
    const opcionesCups = listaCups.map((cups) => (
        <option key={cups.codigo} value={cups.codigo}>
            {cups.nombre}
        </option>
    ));
    const handleSubmit = (e) => { e.preventDefault(); console.log("Datos de Anamnesis:", anamnesis); alert("Formulario enviado con éxito!"); };
    return (
        <>
        <div className="Contenedor_botones">
                <button onClick={handlesOpenAnamnesis}>Anamnesis</button>
                <button onClick={handleOpenDiagnostico}>Diagnóstico</button>
                <button onClick={handleOpenAntecedentesMedicos}>Antecedentes Médicos</button>
                <button onClick={handleOpenSignosVitales}>Signos Vitales</button>
                <button onClick={handleOpenParaclinicos}>Paraclínicos</button>
                <button onClick={handleOpenOrdenProcedimientos}>Orden de Procedimientos</button>
                <button onClick={handleOpenFormulaMedica}>Formula Médica</button>
                <button onClick={handleOpenEvolucion}>Evolución</button>
            </div>
        <div className="contenedor_forms"> 
        {isOpenAnamnesis && <div className="anamnesis-form">
            <h2 className="anamnesis-form__title">Formulario de Anamnesis</h2>
            <form onSubmit={handleSubmit} className="anamnesis-form__body">
                <div className="anamnesis-form__field">
                    <label htmlFor="motivo_consulta">Motivo de consulta:</label>
                    <input
                        type="text"
                        id="motivo_consulta"
                        name="motivo_consulta"
                        value={anamnesis.motivo_consulta}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="anamnesis-form__field">
                    <label htmlFor="inicio_sintomas">Inicio de síntomas:</label>
                    <input
                        type="date"
                        id="inicio_sintomas"
                        name="inicio_sintomas"
                        value={anamnesis.inicio_sintomas}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="anamnesis-form__field">
                    <label htmlFor="sintomas">Síntomas:</label>
                    <textarea
                        id="sintomas"
                        name="sintomas"
                        value={anamnesis.sintomas}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="anamnesis-form__field">
                    <label htmlFor="alergias">Alergias:</label>
                    <input
                        type="text"
                        id="alergias"
                        name="alergias"
                        value={anamnesis.alergias}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="anamnesis-form__field">
                    <label htmlFor="enfermedades_base">Enfermedades base:</label>
                    <input
                        type="text"
                        id="enfermedades_base"
                        name="enfermedades_base"
                        value={anamnesis.enfermedades_base}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="anamnesis-form__field">
                    <label htmlFor="habitos">Hábitos:</label>
                    <select
                        id="habitos"
                        name="habitos"
                        value={anamnesis.habitos}
                        onChange={handleChange}
                        required
                    >
                        <option value="" disabled>Seleccione una opción</option>
                        <option value="Tabaco">Tabaco</option>
                        <option value="Alcohol">Alcohol</option>
                        <option value="Drogas">Drogas</option>
                        <option value="No">No Aplica</option>
                    </select>
                </div>

                <div className="anamnesis-form__field">
                    <label htmlFor="examen_fisico">Examen físico:</label>
                    <textarea
                        id="examen_fisico"
                        name="examen_fisico"
                        value={anamnesis.examen_fisico}
                        onChange={handleChange}
                        required
                    />
                </div>
            </form>
        </div>}
        {isOpenDiagnostico && (
                <div className="diagnostico-form">
                    <h2 className="diagnostico-form__title">Formulario de Diagnóstico</h2>
                    <form onSubmit={handleSubmit} className="diagnostico-form__body">
                        
                        <div className="diagnostico-form__field">
                            <label htmlFor="cie10">CIE10:</label>
                            <select 
                            type="text"
                            id="cie10"
                            name="cie10"
                            value={diagnostico.cie10}
                            onChange={handleChangeDiagnostico}
                            required>
                            <option value="">Seleccione una Cie10</option>
                            {opcionesCie10}

                            </select>
                            
                        </div>
                        <div className="diagnostico-form__field">
                            <label htmlFor="tipo_diagnostico">Tipo de diagnóstico:</label>
                            <select
                                id="tipo_diagnostico"
                                name="tipo_diagnostico"
                                value={diagnostico.tipo_diagnostico}
                                onChange={handleChangeDiagnostico}
                                required
                            >
                                <option value="" disabled>Seleccione un tipo</option>
                                <option value="Principal">Diagnóstico Principal</option>
                                <option value="Secundarios">Diagnósticos Secundarios</option>
                                <option value="Diferencial">Diagnóstico Diferencial</option>
                                <option value="Confirmado">Diagnóstico Confirmado</option>
                                <option value="Enfermedad Aguda">Diagnóstico de Enfermedad Aguda</option>
                                <option value="Rehabilitacion">Diagnóstico de Rehabilitación</option>
                                <option value="Salud Mental">Diagnóstico de Salud Mental</option>
                                <option value="Preventivo">Diagnóstico Preventivo</option>
                                <option value="Riesgo">Diagnóstico de Riesgo</option>
                                <option value="Sindrome">Diagnóstico de Síndrome</option>
                            </select>
                        </div>

                        <div className="diagnostico-form__field">
                            <label htmlFor="fecha_diagnostico">Fecha de diagnóstico:</label>
                            <input
                                type="date"
                                id="fecha_diagnostico"
                                name="fecha_diagnostico"
                                value={diagnostico.fecha_diagnostico}
                                onChange={handleChangeDiagnostico}
                                required
                            />
                        </div>
                        <div className="diagnostico-form__field">
                            <label htmlFor="observaciones">Observaciones:</label>
                            <textarea
                                id="observaciones"
                                name="observaciones"
                                value={diagnostico.observaciones}
                                onChange={handleChangeDiagnostico}
                                required
                            />
                        </div>
                        
                    </form>
                </div>
            )}
            {isOpenAntecedentesMedicos && (
                <div className="antecedentes-medicos-form">
                    <h2 className="antecedentes-medicos-form__title">Formulario de Antecedentes Médicos</h2>
                    <form onSubmit={handleSubmit} className="antecedentes-medicos-form__body">
                        <div className="antecedentes-medicos-form__field">
                            <label htmlFor="cie10">CIE10:</label>
                            <select 
                            type="text"
                            id="cie10"
                            name="cie10"
                            value={antecedentesMedicos.cie10}
                            onChange={handleChangeAntecedentesMedicos}
                            required>
                            <option value="">Seleccione una Cie10</option>
                            {opcionesCie10}

                            </select>
                            
                        </div>
                        <div className="antecedentes-medicos-form__field">
                            <label htmlFor="tipo_diagnostico">Tipo de diagnóstico:</label>
                            <select
                                id="tipo_diagnostico"
                                name="tipo_diagnostico"
                                value={antecedentesMedicos.tipo_diagnostico}
                                onChange={handleChangeAntecedentesMedicos}
                                required
                            >
                                <option value="" disabled>Seleccione un tipo</option>
                                <option value="Principal">Diagnóstico Principal</option>
                                <option value="Secundarios">Diagnósticos Secundarios</option>
                                <option value="Diferencial">Diagnóstico Diferencial</option>
                                <option value="Confirmado">Diagnóstico Confirmado</option>
                                <option value="Enfermedad Aguda">Diagnóstico de Enfermedad Aguda</option>
                                <option value="Rehabilitacion">Diagnóstico de Rehabilitación</option>
                                <option value="Salud Mental">Diagnóstico de Salud Mental</option>
                                <option value="Preventivo">Diagnóstico Preventivo</option>
                                <option value="Riesgo">Diagnóstico de Riesgo</option>
                                <option value="Sindrome">Diagnóstico de Síndrome</option>
                            </select>
                        </div>

                        <div className="antecedentes-medicos-form__field">
                            <label htmlFor="descripcion">Descripción:</label>
                            <textarea
                                id="descripcion"
                                name="descripcion"
                                value={antecedentesMedicos.descripcion}
                                onChange={handleChangeAntecedentesMedicos}
                                required
                            />
                        </div>
                        
                    </form>
                </div>
            )}
            {isOpenSignosVitales && (
                <div className="signos-vitales-form">
                    <h2 className="signos-vitales-form__title">Formulario de Signos Vitales</h2>
                    <form onSubmit={handleSubmit} className="signos-vitales-form__body">
                        <div className="signos-vitales-form__field">
                            <label htmlFor="frecuencia_cardiaca">Frecuencia Cardíaca:</label>
                            <input
                                type="number"
                                id="frecuencia_cardiaca"
                                name="frecuencia_cardiaca"
                                value={signosVitales.frecuencia_cardiaca}
                                onChange={handleChangeSignosVitales}
                                required
                            />
                        </div>
                        <div className="signos-vitales-form__field">
                            <label htmlFor="presion_arterial">Presión Arterial:</label>
                            <input
                                type="number"
                                id="presion_arterial"
                                name="presion_arterial"
                                value={signosVitales.presion_arterial}
                                onChange={handleChangeSignosVitales}
                                required
                            />
                        </div>
                        <div className="signos-vitales-form__field">
                            <label htmlFor="frecuencia_respiratoria">Frecuencia Respiratoria:</label>
                            <input
                                type="number"
                                id="frecuencia_respiratoria"
                                name="frecuencia_respiratoria"
                                value={signosVitales.frecuencia_respiratoria}
                                onChange={handleChangeSignosVitales}
                                required
                            />
                        </div>
                        <div className="signos-vitales-form__field">
                            <label htmlFor="temperatura_corporal">Temperatura Corporal:</label>
                            <input
                                type="number"
                                step="0.1"
                                id="temperatura_corporal"
                                name="temperatura_corporal"
                                value={signosVitales.temperatura_corporal}
                                onChange={handleChangeSignosVitales}
                                required
                            />
                        </div>
                        <div className="signos-vitales-form__field">
                            <label htmlFor="saturacion">Saturación:</label>
                            <input
                                type="text"
                                id="saturacion"
                                name="saturacion"
                                value={signosVitales.saturacion}
                                onChange={handleChangeSignosVitales}
                                required
                            />
                        </div>
                        <div className="signos-vitales-form__field">
                            <label htmlFor="peso">Peso (kg):</label>
                            <input
                                type="number"
                                step="0.1"
                                id="peso"
                                name="peso"
                                value={signosVitales.peso}
                                onChange={handleChangeSignosVitales}
                                required
                            />
                        </div>
                        <div className="signos-vitales-form__field">
                            <label htmlFor="talla">Talla (m):</label>
                            <input
                                type="number"
                                step="0.01"
                                id="talla"
                                name="talla"
                                value={signosVitales.talla}
                                onChange={handleChangeSignosVitales}
                                required
                            />
                        </div>
                        <div className="signos-vitales-form__field">
                            <label htmlFor="imc">IMC:</label>
                            <input
                                type="number"
                                step="0.01"
                                id="imc"
                                name="imc"
                                value={signosVitales.imc}
                                onChange={handleChangeSignosVitales}
                                required
                            />
                        </div>
                    </form>
                </div>
            )}
            {isOpenParaclinicos && (
                <div className="paraclinicos-form">
                    <h2 className="paraclinicos-form__title">Formulario de Paraclínicos</h2>
                    <form onSubmit={handleSubmit} className="paraclinicos-form__body">
                        <div className="paraclinicos-form__field">
                            <label htmlFor="resultados">Resultados:</label>
                            <textarea
                                id="resultados"
                                name="resultados"
                                value={paraclinicos.resultados}
                                onChange={handleChangeParaclinicos}
                                required
                            />
                        </div>
                        <div className="paraclinicos-form__field">
                            <label htmlFor="analisis">Análisis:</label>
                            <textarea
                                id="analisis"
                                name="analisis"
                                value={paraclinicos.analisis}
                                onChange={handleChangeParaclinicos}
                                required
                            />
                        </div>
                    </form>
                </div>
            )}
            {isOpenOrdenProcedimientos && (
                <div className="orden-procedimientos-form">
                    <h2 className="orden-procedimientos-form__title">Formulario de Orden de Procedimientos</h2>
                    <form onSubmit={handleSubmit} className="orden-procedimientos-form__body">
                        <div className="orden-procedimientos-form__field">
                            <label htmlFor="codigo">Código:</label>
                            <input
                                type="text"
                                id="codigo"
                                name="codigo"
                                value={ordenDeProcedimientos.codigo}
                                onChange={handleChangeOrdenProcedimientos}
                                required
                            />
                        </div>
                        <div className="orden-procedimientos-form__field">
                            <label htmlFor="cups">Cups:</label>
                            <select 
                                id="cups"
                                name="cups" 
                                value={ordenDeProcedimientos.cups}
                                onChange={handleChangeOrdenProcedimientos}
                                required
                            >
                                <option value="">Seleccione una Cups</option>
                                {opcionesCups}
                            </select>
                        </div>
                    
                        <div className="orden-procedimientos-form__field">
                            <label htmlFor="descripcion">Descripción:</label>
                            <textarea
                                id="descripcion"
                                name="descripcion"
                                value={ordenDeProcedimientos.descripcion}
                                onChange={handleChangeOrdenProcedimientos}
                                required
                            />
                        </div>
                        <div className="orden-procedimientos-form__field">
                            <label htmlFor="cantidad">Cantidad:</label>
                            <input
                                type="number"
                                id="cantidad"
                                name="cantidad"
                                value={ordenDeProcedimientos.cantidad}
                                onChange={handleChangeOrdenProcedimientos}
                                required
                            />
                        </div>
                        <div className="orden-procedimientos-form__field">
                            <label htmlFor="estado">Estado:</label>
                            <select
                                id="estado"
                                name="estado"
                                value={ordenDeProcedimientos.estado}
                                onChange={handleChangeOrdenProcedimientos}
                                required
                            >
                                <option value="" disabled>Seleccione un estado</option>
                                <option value="RT">Rutinario</option>
                                <option value="UR">Urgente</option>
                                <option value="EM">Emergencia</option>
                                <option value="PD">Pendiente</option>
                                <option value="EP">En Proceso</option>
                                <option value="PG">Programado</option>
                                <option value="CP">Completado</option>
                                <option value="RA">Requiere Autorización</option>
                                <option value="NR">No Realizado</option>
                                <option value="SP">Suspendido</option>
                                <option value="DR">Derivado</option>
                            </select>
                        </div>

                        <div className="orden-procedimientos-form__field">
                            <label htmlFor="observacion">Observación:</label>
                            <textarea
                                id="observacion"
                                name="observacion"
                                value={ordenDeProcedimientos.observacion}
                                onChange={handleChangeOrdenProcedimientos}
                                required
                            />
                        </div>
                    </form>
                </div>
            )}
            {isOpenFormulaMedica && (
                <div className="formula-medica-form">
                    <h2 className="formula-medica-form__title">Formulario de Formula Médica</h2>
                    <form onSubmit={handleSubmit} className="formula-medica-form__body">
                        <div className="formula-medica-form__field">
                            <label htmlFor="nombre_medicamento">Nombre del Medicamento:</label>
                            <input
                                type="text"
                                id="nombre_medicamento"
                                name="nombre_medicamento"
                                value={formulaMedica.medicamento.nombre_medicamento}
                                onChange={handleChangeFormulaMedica}
                                required
                            />
                        </div>
                        <div className="formula-medica-form__field">
                            <label htmlFor="concentracion">Concentración:</label>
                            <input
                                type="text"
                                id="concentracion"
                                name="concentracion"
                                value={formulaMedica.medicamento.concentracion}
                                onChange={handleChangeFormulaMedica}
                                required
                            />
                        </div>
                        <div className="formula-medica-form__field">
                            <label htmlFor="forma_farmaceutica">Forma Farmacéutica:</label>
                            <input
                                type="text"
                                id="forma_farmaceutica"
                                name="forma_farmaceutica"
                                value={formulaMedica.medicamento.forma_farmaceutica}
                                onChange={handleChangeFormulaMedica}
                                required
                            />
                        </div>
                        <div className="formula-medica-form__field">
                            <label htmlFor="dosis">Dosis:</label>
                            <input
                                type="text"
                                id="dosis"
                                name="dosis"
                                value={formulaMedica.medicamento.dosis}
                                onChange={handleChangeFormulaMedica}
                                required
                            />
                        </div>
                        <div className="formula-medica-form__field">
                            <label htmlFor="via_administracion">Vía de Administración:</label>
                            <select
                                id="via_administracion"
                                name="via_administracion"
                                value={formulaMedica.medicamento.via_administracion}
                                onChange={handleChangeFormulaMedica}
                                required
                            >
                                <option value="" disabled>Seleccione una vía</option>
                                <option value="VO">Vía oral</option>
                                <option value="VR">Vía rectal</option>
                                <option value="VT">Vía tópica</option>
                                <option value="TD">Vía transdérmica</option>
                                <option value="VI">Vía inhalatoria</option>
                                <option value="IV">Vía intravenosa</option>
                                <option value="IM">Vía intramuscular</option>
                                <option value="SC">Vía subcutánea</option>
                                <option value="IO">Vía intraósea</option>
                                <option value="IT">Vía intratecal</option>
                                <option value="SL">Vía sublingual</option>
                            </select>
                        </div>

                        <div className="formula-medica-form__field">
                            <label htmlFor="frecuencia">Frecuencia:</label>
                            <input
                                type="text"
                                id="frecuencia"
                                name="frecuencia"
                                value={formulaMedica.medicamento.frecuencia}
                                onChange={handleChangeFormulaMedica}
                                required
                            />
                        </div>
                        <div className="formula-medica-form__field">
                            <label htmlFor="tiempo_tratamiento">Tiempo de Tratamiento:</label>
                            <input
                                type="text"
                                id="tiempo_tratamiento"
                                name="tiempo_tratamiento"
                                value={formulaMedica.medicamento.tiempo_tratamiento}
                                onChange={handleChangeFormulaMedica}
                                required
                            />
                        </div>
                        <div className="formula-medica-form__field">
                            <label htmlFor="cantidad">Cantidad:</label>
                            <input
                                type="number"
                                id="cantidad"
                                name="cantidad"
                                value={formulaMedica.medicamento.cantidad}
                                onChange={handleChangeFormulaMedica}
                                required
                            />
                        </div>
                        <div className="formula-medica-form__field">
                            <label htmlFor="cantidad_letras">Cantidad en Letras:</label>
                            <input
                                type="text"
                                id="cantidad_letras"
                                name="cantidad_letras"
                                value={formulaMedica.medicamento.cantidad_letras}
                                onChange={handleChangeFormulaMedica}
                                required
                            />
                        </div>
                        <div className="formula-medica-form__field">
                            <label htmlFor="posologia">Posología:</label>
                            <textarea
                                id="posologia"
                                name="posologia"
                                value={formulaMedica.medicamento.posologia}
                                onChange={handleChangeFormulaMedica}
                                required
                            />
                        </div>
                        <div className="formula-medica-form__field">
                            <label htmlFor="recomendaciones">Recomendaciones:</label>
                            <textarea
                                id="recomendaciones"
                                name="recomendaciones"
                                value={formulaMedica.medicamento.recomendaciones}
                                onChange={handleChangeFormulaMedica}
                                required
                            />
                        </div>
                    </form>
                </div>
            )}
            {isOpenEvolucion && (
                <div className="evolucion-form">
                    <h2 className="evolucion-form__title">Formulario de Evolución</h2>
                    <form onSubmit={handleSubmit} className="evolucion-form__body">
                        <div className="evolucion-form__field">
                            <label htmlFor="plan_de_manejo">Plan de Manejo:</label>
                            <textarea
                                id="plan_de_manejo"
                                name="plan_de_manejo"
                                value={evolucion.plan_de_manejo}
                                onChange={handleChangeEvolucion}
                                required
                            />
                        </div>
                        <div className="evolucion-form__field">
                            <label htmlFor="evolucion">Evolución:</label>
                            <textarea
                                id="evolucion"
                                name="evolucion"
                                value={evolucion.evolucion}
                                onChange={handleChangeEvolucion}
                                required
                            />
                        </div>
                        <div className="evolucion-form__field">
                            <label htmlFor="recomendaciones">Recomendaciones:</label>
                            <textarea
                                id="recomendaciones"
                                name="recomendaciones"
                                value={evolucion.recomendaciones}
                                onChange={handleChangeEvolucion}
                                required
                            />
                        </div>
                        <div className="evolucion-form__field">
                            <label htmlFor="interconsultas">Interconsultas:</label>
                            <input
                                type="text"
                                id="interconsultas"
                                name="interconsultas"
                                value={evolucion.interconsultas}
                                onChange={handleChangeEvolucion}
                                required
                            />
                        </div>
                        <div className="evolucion-form__field">
                            <label htmlFor="plan_de_seguimiento">Plan de Seguimiento:</label>
                            <textarea
                                id="plan_de_seguimiento"
                                name="plan_de_seguimiento"
                                value={evolucion.plan_de_seguimiento}
                                onChange={handleChangeEvolucion}
                                required
                            />
                        </div>
                        
                    </form>
                </div>
            )}
            </div>   
            <button onClick={crearFolio}>crearFolio</button>
            <Alerta isOpen={openAlerta}>¡Registro exitoso!</Alerta>
        </>
    );
};

export default CrearHv;

