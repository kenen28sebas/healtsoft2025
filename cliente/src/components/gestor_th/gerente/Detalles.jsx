import React, { act , useState , useEffect} from "react";
import './listarips.css'
import './modal.css'
import './detalleips.css'

export default function Detallesservicio({abrirdetallesservicio, cerrardetallesservicio , nombre,descripcion, activo,codigo,token,cargarListaNueva,codigoips}){
    const [isOpenabrirdetallesservicio ,setIsOpenabrirdetallesservicio] = useState(abrirdetallesservicio)
    const [isUpdate , setIsUpdate] = useState(false)
    const [nuevoNombre , setNuevoNombre] = useState(nombre)
    const [nuevaDescripcion , setNuevaDescripcion] = useState(descripcion)
    const [nuevoActivo , setNuevoActivo] = useState(activo)

    useEffect(() => {
        setNuevoNombre(nombre);
        setNuevaDescripcion(descripcion);
        setNuevoActivo(activo);
        setIsOpenabrirdetallesservicio(abrirdetallesservicio);
        setIsUpdate(false); 
    }, [nombre, descripcion, activo, abrirdetallesservicio]);


    if (!isOpenabrirdetallesservicio){
        return null
    }
    const handleActualizar = () =>{
        setIsUpdate(true)
    };
    const handleSubmitUpdate =async (e) =>{
        e.preventDefault();
        const ruta = `http://127.0.0.1:8000/actualizar/servicios/${codigoips}/`
        const header ={
            'Content-Type' : 'application/json',
            'Authorization':`Token ${token.token}`
        }
        const body = JSON.stringify({
            nombre : nuevoNombre,
            descripcion : nuevaDescripcion,
            activo : nuevoActivo,
        });
        const response = await fetch(ruta,{
            method : 'PATCH',
            headers : header,
            body : body,
        });
        if(!response.ok){
            throw new Error(`HTTP error ${response.status}`)
        }
        const data = await response.json()
        console.log('datos obtenidos:',data)

        cargarListaNueva()
        setIsOpenabrirdetallesservicio(false)
    };
    const handkecancelupdate = () =>{
        setIsUpdate(false)
    };

    const handleChange = (e) =>{
        const { name, value, type, checked } = e.target;
        if (name === 'nombre') setNuevoNombre(value)
        if (name === 'descripcion') setNuevaDescripcion(value)
        if (name === 'activo') setNuevoActivo(type === 'checkbox' ? checked : value);
    }

    async function eliminarServicio() {
        const ruta = `http://127.0.0.1:8000/eliminar/servicio/${codigoips}/`
        const header ={
            'Content-Type' : 'application/json',
            'Authorization':`Token ${token.token}`
        }
        const response = await fetch(ruta,{
            method : 'DELETE',
            headers : header,
        })
        if (!response.ok){
            throw new Error(`HTTP error ${response.status}`)
        }
        setIsOpenabrirdetallesservicio(false)
        cargarListaNueva()
    }
    return(
        <>
        <div className="contenedordetallesips animarEntrada">
            <h1 className="detallestituloips">Detalles del servicio</h1>
            <div className="consultaipse">
                <p>Nombre del servicio:</p>
                <p className="textoips">{nombre}</p>
            </div>
            <div className="consultaipse">
                <p>Descripcion:</p>
                <p className="textoips">{descripcion}</p>
            </div>
            <div className="consultaipse">
                <p>Estado del servicio.</p>
                <p className="textoips">{activo}
                    {activo ? (
                            <span style={{ color: 'green', fontWeight: 'bold' }}>Activo</span>
                        ) : (
                            <span style={{ color: 'red', fontWeight: 'bold' }}>Inactivo</span>
                        )}
            </p>
            </div>
            <div className="consultaipse">
                <p>Codigo:</p>
                <p className="textoips">{codigo}</p>
            </div>
            <div className="botonesacciones">
                <button onClick={handleActualizar} className="btnips actualizar">Actualizar</button>
                <button onClick={eliminarServicio} className="btnips eliminar">Eliminar</button>
            </div>
            <button onClick={cerrardetallesservicio} className="btnips cerrar">cerrar</button>
            
        </div>
        {isUpdate && (
            <div className="modal-overlay">
                <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                    <form onSubmit={handleSubmitUpdate} className="formupdateips">
                        <h1 className="tituloactualizarips">Actualizar registro</h1>
                        <input 
                        type="text"
                        placeholder="Nombre del servicio"
                        value={nuevoNombre}
                        onChange={handleChange}
                        name="nombre"
                        className="textosupdateips"
                        />
                        <input 
                        type="text" 
                        placeholder="Descripcion del servicio"
                        value={nuevaDescripcion}
                        onChange={handleChange}
                        name="descripcion"
                        className="textosupdateips"
                        />
                        <label htmlFor="">Estado del servicio</label>
                        <input 
                        type="checkbox" 
                        checked={nuevoActivo}
                        onChange={handleChange}
                        name="activo"
                        className="textosupdateips"
                        />
                        <button type="submit" className="btnguardarcambios">Guardar cambios</button>
                        <button type="buttom" onClick={handkecancelupdate} className="btncancelarupdate">Cancelar</button>
                    </form>
                </div>
            </div>
        )}
        </>
    )
}



export function Detallesips({abrirdetallesips , cerrardetallesips , nombre , direccion , nivel_categorizacion ,telefono , token , id ,cargarListaNuevaips}){
    const [isOpenabrirdetallesips ,setIsOpenabrirdetallesips] = useState(abrirdetallesips)
    const [isUpdate , setIsUpdate] = useState(false)
    const [nuevoNombre , setNuevoNombre] = useState(nombre)
    const [nuevaDireccion , setNuevaDireccion] = useState(direccion)
    const [nuevoNivel , setNuevoNivel] = useState(nivel_categorizacion)
    const [nuevoTelefono , setNuevoTelefono] = useState(telefono)

    useEffect(() =>{
        setNuevoNombre(nombre);
        setNuevaDireccion(direccion);
        setNuevoNivel(nivel_categorizacion);
        setNuevoTelefono(telefono);
        setIsOpenabrirdetallesips(abrirdetallesips);
        setIsUpdate(false); 
    }, [nombre, direccion, nivel_categorizacion, telefono, abrirdetallesips]);
    if (!isOpenabrirdetallesips){
        return null
    }
    const handleActualizar = () =>{
        setIsUpdate(true)
    }
    const handleSubmitUpdate = async (e) =>{
        e.preventDefault()
        const ruta = `http://127.0.0.1:8000/ips/actualizar/${id}/`
        const header = {
            'Content-Type' : 'application/json',
            'Authorization':`Token ${token.token}`
        };
        const body = JSON.stringify({
            nombre : nuevoNombre,
            direccion : nuevaDireccion,
            nivel_categorizacion : nuevoNivel,
            telefono : nuevoTelefono,
        });
        const respuesta = await fetch(ruta ,{
            method : 'PATCH',
            headers : header,
            body : body,
        });
        if (!respuesta.ok){
            throw new Error(`HTTP error ${respuesta.status}`)
        }
        const data = await respuesta.json()
        console.log('datos obtenidos:',data)
        cargarListaNuevaips()
        setIsOpenabrirdetallesips(false)
    };
    const handleCancelUpdate = () =>{
        setIsUpdate(false)
    };

    const handleChange = (e) =>{
        const { name, value } = e.target;
        if (name === 'nombre') setNuevoNombre(value)
        if (name === 'direccion') setNuevaDireccion(value)
        if (name === 'nivel_categorizacion') setNuevoNivel(value)
        if (name === 'telefono') setNuevoTelefono(value)
    }

    async function eliminarIps() {
        const ruta = `http://127.0.0.1:8000/eliminar/ips/${id}/`
        const header ={
            'Content-Type' : 'application/json',
            'Authorization':`Token ${token.token}`
        }
        const response = await fetch(ruta,{
            method :'DELETE',
            headers : header,
        })
        if (!response.ok){
            throw new Error(`HTTP error ${response.status}`)
        }
        setIsOpenabrirdetallesips(false)
        cargarListaNuevaips()
    }

    return(
        <>
        <div className="contenedordetallesips animarEntrada">
            <h1 className="detallestituloips">Detalles de la ips</h1>
            <div className="consultaipse">
                <p>Nombre de la ips:</p>
                <p className="textoips">{nombre}</p>
            </div>
            <div className="consultaipse">
                <p>Direccion:</p>
                <p className="textoips">{direccion}</p>
            </div>
            <div className="consultaipse">
                <p>Nivel de categorizacion:</p>
                <p className="textoips">{nivel_categorizacion}</p>
            </div>
            <div className="consultaipse">
                <p>Telefono:</p>
                <p className="textoips">{telefono}</p>
            </div>
            <div className="botonesacciones">
                <button onClick={handleActualizar} className="btnips actualizar">Actualizar</button>
                <button onClick={eliminarIps} className="btnips eliminar">Eliminar</button>
            </div>
            <button onClick={cerrardetallesips} className="btnips cerrar">Cerrar</button>
        </div>
        {isUpdate &&(
            <div className="modal-overlay">
                <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                    <form onSubmit={handleSubmitUpdate} className="formupdateips">
                        <h1 className="tituloactualizarips">Actualizar registro</h1>
                        <input 
                        type="text"
                        placeholder="Nombre de la ips"
                        value={nuevoNombre}
                        onChange={handleChange}
                        name="nombre"
                        className="textosupdateips"
                        />
                        <input 
                        type="text" 
                        placeholder="Direccion de la ips"
                        value={nuevaDireccion}
                        onChange={handleChange}
                        name="direccion"
                        className="textosupdateips"
                        />
                        <select
                        type="text" 
                        placeholder="Nivel de categorizacion"
                        value={nuevoNivel}
                        onChange={handleChange}
                        name="nivel_categorizacion"
                        className="textosupdateips"
                        >
                            <option value="I">I</option>
                            <option value="II">II</option>
                            <option value="III">III</option>
                            <option value="IV">IV</option>
                        </select>
                        <input 
                        type="text" 
                        placeholder="Telefono de la ips"
                        value={nuevoTelefono}
                        onChange={handleChange}
                        name="telefono"
                        className="textosupdateips"
                        />
                        <button type="submit" className="btnguardarcambios">Guardar cambios</button>
                        <button type="button" onClick={handleCancelUpdate} className="btncancelarupdate">Cancelar</button>
                    </form>
                </div>
            </div>
        )}
        </>
    )
}

export function DetallesCargo ({abrirdetallescargo , cerrardetallescargo, nombre , descripcion , estado , fecha_creacion ,id ,token , cargarListaNueva} ){
    const [isOpenabrirdetallesCargo ,setIsOpenabrirdetallesCargo] = useState(abrirdetallescargo)
    const [isUpdate , setIsUpdate] = useState(false)
    const [nuevoNombre , setNuevoNombre] = useState(nombre)
    const [nuevaDescripcion , setNuevaDescripcion] =useState(descripcion)
    const [nuevoEstado , setNuevoEstado] = useState(estado)
    useEffect(() => {
        setNuevoNombre(nombre);
        setNuevaDescripcion(descripcion);
        setNuevoEstado(estado);
        setIsOpenabrirdetallesCargo(abrirdetallescargo);
        setIsUpdate(false); 
    }, [nombre, descripcion, estado, abrirdetallescargo]);
    const handleActualizar = () =>{ 
        setIsUpdate(true)
    }
    const handleSubmitUpdate = async (e) =>{
        e.preventDefault()
        const ruta = `http://127.0.0.1:8000/actualizar/cargos/${id}/`
        const header = {
            'Content-Type' : 'application/json',
            'Authorization':`Token ${token.token}`
        }
        const body = JSON.stringify({
            nombre : nuevoNombre,
            descripcion : nuevaDescripcion,
            estado : nuevoEstado,
        });
        const response = await fetch(ruta,{
            method : 'PATCH',
            headers : header,
            body : body,
        });
        if (!response.ok){
            throw new Error(`HTTP error ${response.status}`)
        }
        const data = await response.json()
        console.log('datos obtenidos:',data)
        cargarListaNueva()
        setIsOpenabrirdetallesCargo(false)
    };

        

    if (!isOpenabrirdetallesCargo){
        return null
    }
    async function eliminarCArgo() {
        const ruta = `http://127.0.0.1:8000/eliminar/cargo/${id}/`
        const header = {
        'Content-Type' : 'application/json',
        'Authorization':`Token ${token.token}`
        }
        const response = await fetch(ruta,{
            method : 'DELETE',
            headers : header,
        })
        if (!response.ok){
            throw new Error(`HTTP error ${response.status}`)
        }
        setIsOpenabrirdetallesCargo(false)
        cargarListaNueva()
    };
    const handleCancelUpdate = () =>{
        setIsUpdate(false)
    };
    const handleChange = (e) =>{
        const { name, value, type, checked } = e.target;
        if (name === 'nombre') setNuevoNombre(value)
        if (name === 'descripcion') setNuevaDescripcion(value)
        if (name === 'estado') setNuevoEstado(type === 'checkbox' ? checked : value);
    }



    return(
        <>
        <div className="contenedordetallesips animarEntrada">
            <h1 className="detallestituloips">Detalles del cargo</h1>
            <div className="consultaipse">
                <p>Nombre del cargo:</p>
                <p className="textoips">{nombre}</p>
            </div>
            <div className="consultaipse">
                <p>Descripcion del cargo:</p>
                <p className="textoips">{descripcion}</p>
            </div>
            <div className="consultaipse">
                <p>Estado del cargo:</p>
                <p className="textoips">{estado}
                    {estado ? (
                            <span style={{ color: 'green', fontWeight: 'bold' }}>Activo</span>
                        ) : (
                            <span style={{ color: 'red', fontWeight: 'bold' }}>Inactivo</span>
                )}
            </p>
            </div>
            <div className="consultaipse">
                <p>Fecha de Creacion</p>
                <p className="textoips">{fecha_creacion}</p>
            </div>
            <div className="botonesacciones">
                <button onClick={handleActualizar} className="btnips actualizar">Actualizar</button>
                <button onClick={eliminarCArgo} className="btnips eliminar">Eliminar</button>
            </div>
            <button onClick={cerrardetallescargo} className="btnips cerrar">cerrar</button>
        </div>
        {isUpdate &&(
            <div className="modal-overlay">
                <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                    <form onSubmit={handleSubmitUpdate} className="formupdateips">
                        <input 
                        type="text"
                        placeholder="Nombre del cargo"
                        value={nuevoNombre}
                        onChange={handleChange}
                        name="nombre"
                        className="textosupdateips"
                        />
                        <input 
                        type="text" 
                        placeholder="Descripcion del cargo"
                        value={nuevaDescripcion}
                        onChange={handleChange}
                        name="descripcion"
                        className="textosupdateips"
                        />
                        <label htmlFor="">Estado del cargo</label>
                        <input 
                        type="checkbox" 
                        checked={nuevoEstado}
                        onChange={handleChange}
                        name="estado"
                        className="textosupdateips"
                        />
                        <button type="submit" className="btnguardarcambios">Guardar cambios</button>
                        <button type="button" onClick={handleCancelUpdate} className="btncancelarupdate">Cancelar</button>
                    </form>
                </div>
            </div>
            
        )}
        </>
    )

}
