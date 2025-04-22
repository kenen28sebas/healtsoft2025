import React, { useEffect, useState } from 'react';
// import { data, useNavigate } from 'react-router-dom';
import './froms.css'

export default function CrearHv ({token , abierto , documento_auxiliar}){
    if (!abierto){
        return null
    }
    const documento_auxiliarid = documento_auxiliar
    const [first_name , setfirst_name] = useState("")
    const [last_name , setlast_name] = useState("")
    const [email , setemail] = useState("")
    const [password , setpassword] = useState("")
    const [especialidad , setespecialidad] = useState("")
    const [contrato , setcontrato] = useState("")
    const [sueldo , setsueldo] = useState(0)
    const [nro_doc, setnro_doc] = useState("")
    const [tdoc , settdoc] = useState("")
    const [lugarexp , setlugarexp] = useState("")
    const [fechaexpt , setfechaexpt] = useState("")
    const [sexo , setsexo] = useState("")
    const [fechana , setfechana] = useState("")
    const [estadocv , setestadocv] = useState("")
    const [telefono , settelefono] = useState("")
    const [nacionalidad , setnacionalidad] = useState("")
    const [municipio , setmunicipio] = useState("")
    const [username , setusername] = useState("")
    const [cargo , setcargo] = useState ()
    const [lista ,  setlista] = useState([])


    
    const ruta2 = 'http://127.0.0.1:8000/consultar/cargos'
    const header = {
        'Content-Type' : 'application/json',
        'Authorization':`Token ${token.token}`
    }

    async function cargarlistas (){
        const respuesta = await fetch(ruta2,{
            method : 'GET',
            headers : header,
        })
        if (!respuesta.ok){
            throw new Error(`HTTP error status : ${respuesta.status}`);
        }
        const datos = await respuesta.json();
        console.log(datos)
        setlista(datos)
    }
    
    useEffect(() =>{
        cargarlistas();

    }, [])

    const rura1 = 'http://127.0.0.1:8000/registrar'
    const body = JSON.stringify({
        tipo_usuario : "medico",
        especialidad : especialidad,
        contrato : contrato,
        sueldo : sueldo,
        cargo:cargo,
        usuario: {
            first_name : first_name,
            last_name : last_name,
            password : password,
            nro_doc:nro_doc,
            tipo_doc : tdoc,
            lugar_exp_doc : lugarexp,
            fecha_exp_doc : fechaexpt,
            sexo : sexo,
            fecha_nacimiento : fechana,
            estado_civil : estadocv,
            telefono : telefono,
            nacionalidad : nacionalidad,
            municipio : municipio,
            username:username,
        },
    })
    const rutata3 = 'http://127.0.0.1:8000/hoja/vida'
    const handleSubmit = async (l) =>{
        l.preventDefault();
        const response = await fetch(rura1, {
            method : 'POST',
            headers : header,
            body : body,
        });
        if (!response.ok){
            throw new Error(`error akajsakjs: ${response.status}`);
        }
        const data = await response.json();
        console.log('datos obtendis mau :', data)
        console.log(body)

        const body2 = JSON.stringify({
            nro_doc:nro_doc,
            gestor_th : documento_auxiliarid,
        })
        console.log(body2)
        const response2 = await fetch(rutata3 ,{
            method : 'POST',
            headers : header,
            body : body2
        });
        console.log(response2)
    }
    const nlista = lista.map(item => <option value={item.id}>{item.nombre}</option>)
    
    return(
        <>
        <div className='cont'>
            <form onSubmit={handleSubmit} className='fromularios'>
                <div className='inputscont'>
                    <div>
                        {/* <label htmlFor="username">Nombre de usuario</label> */}
                        <input
                        placeholder='Nombre de usuario'
                        className='inputs'
                        type="text" 
                        id="username"
                        value={username || ""}
                        onChange={(l) => setusername(l.target.value)}
                        />
                    </div>
                    <div>
                        {/* <label htmlFor="cargo">Cargo</label> */}
                        <select
                        className='inputs' 
                        name="cargo" 
                        id="cargo"
                        value={cargo}
                        onChange={(l) => setcargo(l.target.value)}
                        >
                            {/* <option value="">Selecciona un cargo</option> */}
                            {nlista}
                        </select>
                    </div>
                </div>

                <div className='inputscont'>
                    <div>
                        {/* <label htmlFor="first_name">Nombres</label> */}
                        <input
                        placeholder='Nombres completos'
                        className='inputs'
                        type="text" 
                        id='first_name'
                        value={first_name || ""}
                        onChange={(l) => setfirst_name(l.target.value)}
                        />
                    </div>
                    <div>
                        {/* <label htmlFor="last_name">Apellidos</label> */}
                        <input
                        placeholder='Apellidos'
                        className='inputs'
                        type="text" 
                        id='last_name'
                        value={last_name || ""}
                        onChange={(l) => setlast_name(l.target.value)}
                        />
                    </div>
                </div>

                <div className='inputscont'>
                    <div>
                        {/* <label htmlFor="email">Email</label> */}
                        <input
                        placeholder='Email'
                        className='inputs'
                        type="text"
                        id='email'
                        value={email || ""}
                        onChange={(l) => setemail(l.target.value)}
                        />
                    </div>
                    <div>
                        {/* <label htmlFor="especialidad">Especialidad</label> */}
                        <input
                        placeholder='Especialidad'
                        className='inputs'
                        id='especialidad'
                        type='text'
                        value={especialidad || ""}
                        onChange={(l) => setespecialidad(l.target.value)}
                        />
                    </div>
                </div>

                <div className='inputscont'>
                    <div>
                        {/* <label htmlFor="contrato">Tipo de contrato</label> */}
                        <input
                        placeholder='Tipo de contrato'
                        className='inputs'
                        id='contrato'
                        type='text'
                        value={contrato || ""}
                        onChange={(l) => setcontrato(l.target.value)}
                        />
                    </div>
                    <div>
                        {/* <label htmlFor="sueldo">Sueldo</label> */}
                        <input
                        placeholder='Sueldo'
                        className='inputs'
                        type='text'
                        id='sueldo'
                        value={sueldo || ""}
                        onChange={(l) => setsueldo(l.target.value)}
                        />
                    </div>
                </div>

                <div className='inputscont'>
                    <div>
                        {/* <label htmlFor="nro_doc">Numero de documento</label> */}
                        <input
                        placeholder='Numero de documento'
                        className='inputs'
                        type="text" 
                        id='nro_doc'
                        value={nro_doc || ""}
                        onChange={(l) => setnro_doc(l.target.value)}
                        />
                    </div>
                    <div>
                        {/* <label htmlFor="tdoc">Tipo de documento</label> */}
                        <select
                        className='inputs'
                        id="tdoc"
                        value={tdoc || ""}
                        onChange={(l) => settdoc(l.target.value)}
                        >
                            <option value="" disabled={true}>Selecciona un tipo de documento</option>
                            <option value="">Selecciona</option>
                            <option value="CC">CC</option>
                            <option value="CE">CE</option>
                            <option value="TI">TI</option>
                            <option value="RC">RC</option>
                            <option value="PA">PA</option>
                            <option value="ASI">ASI</option>
                            <option value="MSI">MSI</option>
                        </select>
                    </div>
                </div>

                <div className='inputscont'>
                    <div>
                        {/* <label htmlFor="lugarexp">Lugar de expedicion</label> */}
                        <input
                        placeholder='Lugar de expedición'
                        className='inputs'
                        type="text"
                        id='lugarexp'
                        value={lugarexp || ""}
                        onChange={(l) => setlugarexp(l.target.value)}
                        />
                    </div>
                    <div>
                        {/* <label htmlFor="">Fecha de expedición</label> */}
                        <input
                        placeholder='Lugar de expedicion'
                        className='inputs'
                        type="date"
                        id='fechaexpt'
                        value={fechaexpt || ""}
                        onChange={(l) => setfechaexpt(l.target.value)}
                        />
                    </div>
                </div>
                
                <div className='inputscont'>
                    <div>
                        {/* <label htmlFor="sexo">Sexo</label> */}

                        <select
                        className='inputs'
                        id='sexo'
                        value={sexo || ""}
                        placeholder = 'Sexo'
                        onChange={(l) => setsexo(l.target.value)}
                        >
                            <option value="" disabled={true}>Genero</option>
                            <option value="M">M</option>
                            <option value="F">F</option>
                        </select>
                        {/* <input
                        placeholder='Sexo'
                        className='inputs'
                        type="text"
                        id ='sexo'
                        value={sexo || ""}
                        onChange={(l) => setsexo(l.target.value)}
                        /> */}
                    </div>
                    <div>
                        {/* <label htmlFor="fechana">Fecha de nacimiento</label> */}
                        <input
                        placeholder='Fecha de nacimiento'
                        className='inputs'
                        type="date"
                        id='fechana'
                        value={fechana || ""}
                        onChange={(l) => setfechana(l.target.value)}
                        />
                    </div>
                </div>

                <div className='inputscont'>
                    <div>
                        {/* <label htmlFor="">Estado civil</label> */}
                        <select
                        className='inputs'
                        id="estadocv"
                        value={estadocv || ""}
                        onChange={(l) => setestadocv(l.target.value)}
                        >
                            <option value="" disabled={true}>Estado civil</option>
                            <option value="Soltero">Soltero</option>
                            <option value="Casado">Casado</option>
                            <option value="Divorciado">Divorciado</option>
                            <option value="Viudo">Viudo</option>
                            <option value="Union libre">Union Libre</option>
                            <option value="Separado">Separado</option>
                        </select>
                    </div>
                    <div>
                        {/* <label htmlFor="">Telefono</label> */}
                        <input
                        placeholder='Telefono'
                        className='inputs'
                        type="text"
                        id='telefono'
                        value={telefono || ""}
                        onChange={(l) => settelefono(l.target.value)}
                        />
                    </div>
                </div>

                <div className='inputscont'>
                    <div>
                        {/* <label htmlFor="">Nacionalidad</label> */}
                        <input
                        placeholder='Nacionalidad'
                        className='inputs'
                        type="text" 
                        id='nacionalidad'
                        value={nacionalidad || ""}
                        onChange={(l) => setnacionalidad(l.target.value)}
                        />
                    </div>
                    <div>
                        {/* <label htmlFor="">Municipio</label> */}
                        <input
                        placeholder='Municipio'
                        className='inputs'
                        type="text"
                        id='municipio'
                        value={municipio || ""}
                        onChange={(l) => setmunicipio(l.target.value)}
                        />
                    </div>
                </div>
                <div className='contpassword'>
                    <div>
                        {/* <label htmlFor="">Password</label> */}
                        <input
                        placeholder='Contraseña'
                        className='inputs'
                        type="text"
                        id='password'
                        value={password || ""}
                        onChange={(l) => setpassword (l.target.value)}
                        />
                    </div>
                </div>
                <button type='submit' className='btnguardar'>Guardar</button>
            </form>
        </div>
        </>
    )
}