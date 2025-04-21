import React, { useEffect, useState } from "react";

function VerPerfil({ nombre, apellido, nro_doc, sueldo, email, estado_civil, telefono, nacionalidad, municipio, token , cargarListaNueva}) {
    const [updateMedico, setUpdateMedico] = useState(false);

    const [nuevoNombre, setNuevoNombre] = useState(nombre);
    const [apellidoNuevo, setApellidoNuevo] = useState(apellido);
    const [sueldoNuevo, setSueldoNuevo] = useState(sueldo);
    const [emailNuevo, setEmailNuevo] = useState(email);
    const [estadoCivilNuevo, setEstadoCivilNuevo] = useState(estado_civil);
    const [telefonoNuevo, setTelefonoNuevo] = useState(telefono);
    const [nacionalidadNueva, setNacionalidadNueva] = useState(nacionalidad);
    const [municipioNuevo, setMunicipioNuevo] = useState(municipio);

    useEffect(() => {
        setNuevoNombre(nombre);
        setApellidoNuevo(apellido);
        setSueldoNuevo(sueldo);
        setEmailNuevo(email);
        setEstadoCivilNuevo(estado_civil);
        setTelefonoNuevo(telefono);
        setNacionalidadNueva(nacionalidad);
        setMunicipioNuevo(municipio);
    }, [nombre, apellido,sueldo, email, estado_civil, telefono, nacionalidad, municipio]);

    function activarUpdate() {
        setUpdateMedico(true);
    }

    function cancelarUpdateMedico() {
        setUpdateMedico(false);
    }

    function handleChange(e) {
        const campo = e.target.name;
        const valor = e.target.value;

        if (campo === 'nombre') setNuevoNombre(valor);
        if (campo === 'apellido') setApellidoNuevo(valor);
        if (campo === 'sueldo') setSueldoNuevo(valor);
        if (campo === 'email') setEmailNuevo(valor);
        if (campo === 'estado_civil') setEstadoCivilNuevo(valor);
        if (campo === 'telefono') setTelefonoNuevo(valor);
        if (campo === 'nacionalidad') setNacionalidadNueva(valor);
        if (campo === 'municipio') setMunicipioNuevo(valor);
    }

    async function handleSubmit(e) {
        e.preventDefault();

        const ruta = `http://127.0.0.1:8000/actualizar/medico/${nro_doc}/`;
        const header = {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token.token}`
        };
        const body = JSON.stringify({
            first_name: nuevoNombre,
            last_name: apellidoNuevo,
            sueldo: sueldoNuevo,
            email: emailNuevo,
            estado_civil: estadoCivilNuevo,
            telefono: telefonoNuevo,
            nacionalidad: nacionalidadNueva,
            municipio: municipioNuevo,
        });

        const respuesta = await fetch(ruta, {
            method: 'PATCH',
            headers: header,
            body: body,
        });

        if (!respuesta.ok) {
            throw new Error(`HTTP error ${respuesta.status}`);
        }

        const data = await respuesta.json();
        console.log('datos obtenidos:', data);
        cargarListaNueva();
        setUpdateMedico(false);
    }
    async function eliminarMedico(){
        const rutadelete = `http://127.0.0.1:8000/eliminar/Usuario/${nro_doc}/`
        const header = {
            'Content-Type': 'application/json',
            'Authorization':`Token ${token.token}`
        }
        const response5 = await fetch(rutadelete,{
            method : 'DELETE',
            headers : header,
        });
        if (!response5.ok){
            throw new Error (`HTTP error ${response5.status}`);
        }
        setUpdateMedico(false);
        cargarListaNueva();
    }

    return (
        <>
            <div>
                <p>{nombre}</p>
                <p>{apellido}</p>
                <p>{nro_doc}</p>
                <p>{sueldo}</p>
                <p>{email}</p>
                <p>{estado_civil}</p>
                <p>{telefono}</p>
                <p>{nacionalidad}</p>
                <p>{municipio}</p>
                <button onClick={activarUpdate}>Actualizar registro</button>
                <button onClick={eliminarMedico}>Eliminar</button>
            </div>

            {updateMedico && (
                <div>
                    <form onSubmit={handleSubmit}>
                        <input type="text" name="nombre" value={nuevoNombre} onChange={handleChange} placeholder="Nombre" />
                        <input type="text" name="apellido" value={apellidoNuevo} onChange={handleChange} placeholder="Apellido" />
                        <input type="number" name="sueldo" value={sueldoNuevo} onChange={handleChange} placeholder="Sueldo" />
                        <input type="text" name="email" value={emailNuevo} onChange={handleChange} placeholder="Email" />
                        <input type="text" name="estado_civil" value={estadoCivilNuevo} onChange={handleChange} placeholder="Estado civil" />
                        <input type="number" name="telefono" value={telefonoNuevo} onChange={handleChange} placeholder="Telefono" />
                        <input type="text" name="nacionalidad" value={nacionalidadNueva} onChange={handleChange} placeholder="Nacionalidad" />
                        <input type="text" name="municipio" value={municipioNuevo} onChange={handleChange} placeholder="Municipio" />
                        <button type="submit">Guardar cambios</button>
                        <button type="button" onClick={cancelarUpdateMedico}>Cancelar</button>
                    </form>
                </div>
            )}
        </>
    );
}

export default VerPerfil;
