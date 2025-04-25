import React, { useEffect, useState } from "react";
import './verperfil.css'

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
            <div className="divinfomodal">
                <div className="infoconttent">
                    <p>Nombre:</p>
                    <p className="ifoperfiltexts">{nombre}</p>
                </div>
                <div className="infoconttent">
                    <p>Apellido:</p>
                    <p className="ifoperfiltexts">{apellido}</p>
                </div>
                <div className="infoconttent">
                    <p>Numero de documento:</p>
                    <p className="ifoperfiltexts">{nro_doc}</p>
                </div>
                <div className="infoconttent">
                    <p>Sueldo</p>
                    <p className="ifoperfiltexts">{sueldo}</p>
                </div>
                <div className="infoconttent">
                    <p>Email</p>
                    <p className="ifoperfiltexts">{email}</p>
                </div>
                <div className="infoconttent">
                    <p>Estado civil</p>
                    <p className="ifoperfiltexts">{estado_civil}</p>
                </div>
                <div className="infoconttent">
                    <p>Telefono</p>
                    <p className="ifoperfiltexts">{telefono}</p>
                </div>
                <div className="infoconttent">
                    <p>Telefono</p>
                    <p className="ifoperfiltexts">{telefono}</p>
                </div>
                <div className="infoconttent">
                    <p>Municipio</p>
                    <p className="ifoperfiltexts">{municipio}</p>
                </div>
                <button onClick={activarUpdate} className="btnactualizarregistro">Actualizar registro</button>
                <button onClick={eliminarMedico} className="eliminarregistroperfil">Eliminar</button>
            </div>

            {updateMedico && (
                <div className="modalcontainer">
                    <form onSubmit={handleSubmit} className="formactualizarregistro">
                        <input type="text" name="nombre" value={nuevoNombre} onChange={handleChange} placeholder="Nombre" className="infohojadevida"/>
                        <input type="text" name="apellido" value={apellidoNuevo} onChange={handleChange} placeholder="Apellido" className="infohojadevida" />
                        <input type="number" name="sueldo" value={sueldoNuevo} onChange={handleChange} placeholder="Sueldo" className="infohojadevida" />
                        <input type="text" name="email" value={emailNuevo} onChange={handleChange} placeholder="Email" className="infohojadevida"/>
                        <input type="text" name="estado_civil" value={estadoCivilNuevo} onChange={handleChange} placeholder="Estado civil" className="infohojadevida" />
                        <input type="number" name="telefono" value={telefonoNuevo} onChange={handleChange} placeholder="Telefono"  className="infohojadevida"/>
                        <input type="text" name="nacionalidad" value={nacionalidadNueva} onChange={handleChange} placeholder="Nacionalidad" className="infohojadevida" />
                        <input type="text" name="municipio" value={municipioNuevo} onChange={handleChange} placeholder="Municipio" className="infohojadevida" />
                        <button type="submit" className="btnguardarcambios">Guardar cambios</button>
                        <button type="button" onClick={cancelarUpdateMedico} className="btncacelarcerrar">Cancelar</button>
                    </form>
                </div>
            )}
        </>
    );
}

export default VerPerfil;
