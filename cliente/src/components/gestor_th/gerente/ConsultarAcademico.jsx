import React, { useState, useEffect } from "react";

function ConsultarAcademico({ abrir, token, nro_doc }) {
    const [listaAcademicos, setlistaAcademicos] = useState([]);
    const [error, setError] = useState(null);
    const [tituloObtenido , setTituloObtenido] = useState("");
    const [institucionEducativa , setInstitucionEducativa] = useState("");
    const [fechaInicio , setFechaInicio] = useState("");
    const [fechaCulminado , setFechaCulminado] = useState("");
    const [nivelEducativo , setNivelEducativo] = useState("");
    const [academicoSeleccionado , setacademicoseleccionado] = useState(null);

    useEffect(() =>{
        if(academicoSeleccionado){
            setTituloObtenido(academicoSeleccionado.titulo_obtenido);
            setInstitucionEducativa(academicoSeleccionado.institucion_educativa);
            setFechaInicio(academicoSeleccionado.fecha_inicio);
            setFechaCulminado(academicoSeleccionado.fecha_culminado);
            setNivelEducativo(academicoSeleccionado.nivel_educativo);
        }

    },[academicoSeleccionado]);

    if (!abrir) {
        return null;
    }

    const ruta = `http://127.0.0.1:8000/consultar/academicos/${nro_doc}/`;
    const header = {
        'Content-Type': 'application/json',
        'Authorization': `Token ${token.token}`
    };

    async function handleSubmit() {
        try {
            const respuesta = await fetch(ruta, {
                method: 'GET',
                headers: header,
            });
            if (!respuesta.ok) {
                throw new Error(`HTTP error ${respuesta.status}`);
            }
            const datos = await respuesta.json();
            console.log('datos obtenidos:', datos);
            setlistaAcademicos(datos);
        } catch (err) {
            setError(err.message); 
        }
    }

    useEffect(() => {
        handleSubmit();
    }, [nro_doc]);

    async function actualizarAcademico(e){
        e.preventDefault();
        const body = JSON.stringify({
            titulo_obtenido : tituloObtenido,
            institucion_educativa : institucionEducativa,
            fecha_inicio : fechaInicio,
            fecha_culminado : fechaCulminado,
            nivel_educativo : nivelEducativo,
        });
        const rutaupdate = `http://127.0.0.1:8000/actualizar/academico/${academicoSeleccionado.id}/`
        const responseupdate = await fetch(rutaupdate,{
            method : 'PATCH',
            headers : header,
            body : body,
        });
        if (!responseupdate.ok){
            throw new Error(`HTTP error ${responseupdate.status}`);
        }
        const datos = await responseupdate.json();
        console.log('datos obtenidos:',datos);
        console.log(body);
        handleSubmit();
        setacademicoseleccionado(null);
    }

    const headerdelete = {
        'Content-Type': 'application/json',
        'Authorization': `Token ${token.token}`
    }

    async function eliminarAcademico(id){
        const rutadelete = `http://127.0.0.1:8000/academico/eliminar/${id}/`
        const responsedelete = await fetch(rutadelete,{
            method : 'DELETE',
            headers : headerdelete,
        });
        if (!responsedelete.ok){
            throw new Error(`HTTP error ${responsedelete.status}`);
        }
        console.log("Academico eliminado con exito")
        setlistaAcademicos(listaAcademicos.filter(exp => exp.id !== id));

        // ConsultarAcademico();

    }



    return (
        <>
        {academicoSeleccionado && (
            <form onSubmit={actualizarAcademico}>
                <h2>Actualizar informacion academica</h2>
                <div>
                    <input 
                    type="text"
                    placeholder="Titulo obtenido"
                    value={tituloObtenido}
                    onChange={(e) => setTituloObtenido(e.target.value)}
                    />
                </div>
                <div>
                    <input 
                    type="text"
                    placeholder="Institucion educativa"
                    value={institucionEducativa}
                    onChange={(e) => setInstitucionEducativa(e.target.value)}
                    />
                </div>
                <div>
                    <input 
                    type="text"
                    placeholder="Fecha inicio"
                    value={fechaInicio}
                    onChange={(e) => setFechaInicio(e.target.value)}
                    />
                </div>
                <div>
                    <input 
                    type="text"
                    placeholder="Fecha culminado"
                    value={fechaCulminado}
                    onChange={(e) => setFechaCulminado(e.target.value)}
                    />
                </div>
                <div>
                    <input 
                    type="text" 
                    placeholder="Nivel educativo"
                    value={nivelEducativo}
                    onChange={(e) => setNivelEducativo(e.target.value)}
                    />
                </div>
                <button type="submit">Guardar cambios</button>
                <button onClick={() => setacademicoseleccionado(null)}>Cancelar</button>
            </form>
        )}
            <div>
                <h3>Información académica</h3>
                <table>
                    <thead>
                        <tr>
                            <th>Título obtenido</th>
                            <th>Institución educativa</th>
                            <th>Fecha inicio</th>
                            <th>Fecha finalización</th>
                            <th>Nivel Educativo</th>
                        </tr>
                    </thead>
                    <tbody>
                        {listaAcademicos.length === 0 ? (
                            <tr>
                                <td colSpan="5">No se encontraron registros académicos</td>
                            </tr>
                        ) : (
                            listaAcademicos.map((item) => (
                                <tr key={item.id}>
                                    <td>{item.titulo_obtenido}</td>
                                    <td>{item.institucion_educativa}</td>
                                    <td>{item.fecha_inicio}</td>
                                    <td>{item.fecha_culminado}</td>
                                    <td>{item.nivel_educativo}</td>
                                    <td><button onClick={() => setacademicoseleccionado(item)}>Actualizar académico</button></td>
                                    <td><button onClick={() => eliminarAcademico(item.id)}>Eliminar académico</button></td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default ConsultarAcademico;