import React, { useEffect, useState } from "react";

function ConsultarExperienciaL({openExperiencias , token , nro_doc}){
    const [listaExperiencia , setListaExperiencia] = useState([])
    const [nombreEmpresa , setNombreEmpresa] = useState("");
    const [cargoExperiencia , setCargoExperiencia] = useState("");
    const [fechaInicio , setFechaInicio] = useState("");
    const [fechaFinalizacion , setFechaFinalizacion] = useState("");
    const [tipoContrato , setTipoContrato] = useState("");
    const [experienciaSeleccionada, setExperienciaSeleccionada] = useState(null);
    useEffect(() => {
        if (experienciaSeleccionada) {
            setNombreEmpresa(experienciaSeleccionada.nombre_empresa);
            setCargoExperiencia(experienciaSeleccionada.cargo);
            setFechaInicio(experienciaSeleccionada.fecha_inicio);
            setFechaFinalizacion(experienciaSeleccionada.fecha_finalizacion);
            setTipoContrato(experienciaSeleccionada.tipo_contrato);
        }
    }, [experienciaSeleccionada]);

    if (!openExperiencias){
        return null
    }
    const ruta = `http://127.0.0.1:8000/consultar/experiencias/${nro_doc}/`
    const header ={
        'Content-Type' : 'application/json',
        'Authorization':`Token ${token.token}`
    }
    
    async function ConsultarCargos (){
        const respuesta = await fetch(ruta,{
            method : 'GET',
            headers : header,
        });
        if (!respuesta.ok){
            throw new Error (`HTTP error ${respuesta.status}`);
        };
        const datos = await respuesta.json();
        setListaExperiencia(datos)
    }
    useEffect(() =>{
        ConsultarCargos();
    },[nro_doc]);

    const headerupdate = {
        'Content-Type': 'application/json',
        'Authorization': `Token ${token.token}`
    };


    async function ActualizarExperiencia(e) {
        e.preventDefault();

        const body = JSON.stringify({
            nombre_empresa: nombreEmpresa,
            cargo: cargoExperiencia,
            fecha_inicio: fechaInicio,
            fecha_finalizacion: fechaFinalizacion,
            tipo_contrato: tipoContrato,
        });
        const rutaupdate = `http://127.0.0.1:8000/experiencia/actualizar/${experienciaSeleccionada.id}/`;

        const response = await fetch(rutaupdate, {
            method: 'PATCH',
            headers: headerupdate,
            body: body,
        });

        if (!response.ok) {
            console.log(response)
            throw new Error(`HTTP error ${response.status}`);
        }

        const datos = await response.json();
        console.log('Experiencia actualizada:', datos);
        console.log(body)

        ConsultarCargos();

        setExperienciaSeleccionada(null);
    }
    const headerdelete = {
        'Content-Type': 'application/json',
        'Authorization': `Token ${token.token}`
    }
    async function EliminarexpLa (id){
        const rutadelete = `http://127.0.0.1:8000/experiencia/eliminar/${id}/`
        const respuestadelete = await fetch(rutadelete,{
            method : 'DELETE',
            headers : headerdelete,
        });
        if (!respuestadelete.ok){
            throw new Error (`HTTP error ${respuestadelete.status}`);
        }
        console.log("experiencia eliminada")
        ConsultarCargos()
    }




    return(
        <>
        {experienciaSeleccionada && (
            <form onSubmit={ActualizarExperiencia}>
                <h2>Actualizar experiencia laboral</h2>
                <div>
                    <input 
                    type="text"
                    placeholder="Nombre de la empresa"
                    value={nombreEmpresa}
                    onChange={(e) => setNombreEmpresa(e.target.value)}
                    />
                </div>
                <div>
                    <input 
                    type="text" 
                    placeholder="cargo"
                    value={cargoExperiencia}
                    onChange={(e) => setCargoExperiencia(e.target.value)}
                    />
                </div>
                <div>
                    <input 
                    type="date" 
                    placeholder="Fecha de inicio"
                    value={fechaInicio}
                    onChange={(e) => setFechaInicio(e.target.value)}
                    />
                </div>
                <div>
                    <input 
                    type="date"
                    placeholder="Fecha de finalizacion"
                    value={fechaFinalizacion}
                    onChange={(e) => setFechaFinalizacion(e.target.value)}
                    />
                </div>
                <div>
                    <input 
                    type="text" 
                    placeholder="Tipo de contrato"
                    value={tipoContrato}
                    onChange={(e) => setTipoContrato(e.target.value)}
                    />
                </div>
                <button type="submit">Guardar cambios</button>
                <button onClick={() => setExperienciaSeleccionada(null)}>Cancelar</button>
            </form>
        )}
        <div className="continfoacademica">
            <h3 className="tltinformacionacademica">Experiencias laborales</h3>
            <table className="tablainfoaca">
                <thead className="encabezadosinfo">
                    <tr>
                        <th className="itemsacademicos">Nombre de la empresa</th>
                        <th className="itemsacademicos">Cargo</th>
                        <th className="itemsacademicos">Fecha de inicio</th>
                        <th className="itemsacademicos">Fecha de finalización</th>
                        <th className="itemsacademicos">Tipo de contrato</th>
                    </tr>
                </thead>
                <tbody className="tablacuerpoacademico">
                    {listaExperiencia.length === 0 ?(
                        <tr>
                            <td colSpan="5">Esta persona no tiene registros academicos</td>
                        </tr>
                    ) : (
                        listaExperiencia.map((item) => (
                            <tr key={item.id} className="itemsacademicos4">
                                <td className="itemsacademicosinformacion">{item.nombre_empresa}</td>
                                <td className="itemsacademicosinformacion">{item.cargo}</td>
                                <td className="itemsacademicosinformacion">{item.fecha_inicio}</td>
                                <td className="itemsacademicosinformacion">{item.fecha_finalizacion}</td>
                                <td className="itemsacademicosinformacion">{item.tipo_contrato}</td>
                                <td className="itemsacademicosinformacion"><button onClick={() => setExperienciaSeleccionada(item)}>Actualizar Experiencia</button></td>
                                <td className="itemsacademicosinformacion"><button onClick={() => EliminarexpLa(item.id)}>Eliminar Experiencia</button></td>
                            </tr>

                        ))
                    )
                }
                </tbody>
            </table>
        </div>

        </>
    );
}

export default ConsultarExperienciaL;
