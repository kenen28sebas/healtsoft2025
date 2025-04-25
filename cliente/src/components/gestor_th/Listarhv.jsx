import React, { useEffect, useState } from "react";
import VerPerfil from "./VerPerfil";
import  './gerente/listarhc.css'
import ConsultarAcademico from "./gerente/ConsultarAcademico";
import ConsultarExperienciaL from "./gerente/ConsultarExperienciaL";
import './listarhv.css'

function ListarHv({token , openlistarhv}){
    if (!openlistarhv){
        return null
    }

    const [lista , setlista] = useState([])
    const [datosMedico ,setDatosMedico] = useState(null)
    const [abrirPerfil , setAbrilPerfil] = useState(null)
    const [abriracademico , setabriracademico] = useState(false)
    const [abrirexperiencial , setabrirexperiencial] = useState(false)
    const ruta = 'http://127.0.0.1:8000/listar/hv/'
    const header = {
        'Content-Type' : 'application/json',
        'Authorization':`Token ${token.token}`
    }
    function abrirlistaacademicos(medico){
        setDatosMedico(medico);
        setabriracademico(true);
        setAbrilPerfil(false);
        setabrirexperiencial(false);
    }
    function abrirexperienciasl(medico){
        setDatosMedico(medico);
        setabrirexperiencial(true);
        setabriracademico(false);
    }

    async function listarhv() {
        const response = await fetch(ruta,{
            method : 'GET',
            headers : header,
        });
        if (!response.ok){
            throw new Error(`error : ${response.status}`)
        }
        const datos = await response.json();
        console.log(datos)
        setlista(datos)
    }
    useEffect(() =>{
        listarhv();
    } , []);

    const cargarDatosMedico = (item) => {
        setDatosMedico(item)
        setAbrilPerfil(true)
    }
    console.log(datosMedico)
    const hv = lista.map(item =>
        <tr className="tablainfohv">
            <td className="itemingohv">{item.personal_medico.usuario.first_name}</td>
            <td className="itemingohv">{item.personal_medico.usuario.last_name}</td>
            <td className="itemingohv">{item.personal_medico.usuario.nro_doc}</td>
            <td className="itemingohv">{item.personal_medico.usuario.tipo_doc}</td>
            <td className="btnverperfil"><button onClick={() => cargarDatosMedico(item.personal_medico)}>ver perfil</button></td>
            <td className="btnveracademico"><button onClick={() => abrirlistaacademicos(item.personal_medico)}>Ver información Académica</button>
            </td>
            <td className="btnverexperiencia"><button onClick={() => abrirexperienciasl(item.personal_medico)}>Ver experiencia laboral</button></td>
        </tr>
    )

    return(
        <>
        <div className="cont_info">
            <div>
                {hv}
            </div>
            <div>
                {abrirPerfil && <VerPerfil 
                nombre={datosMedico.usuario.first_name} 
                apellido={datosMedico.usuario.last_name}
                nro_doc={datosMedico.usuario.nro_doc}
                sueldo={datosMedico.sueldo}
                email={datosMedico.usuario.email}
                estado_civil={datosMedico.usuario.estado_civil}
                telefono={datosMedico.usuario.telefono}
                nacionalidad={datosMedico.usuario.nacionalidad}
                municipio={datosMedico.usuario.municipio}
                token={token}
                cargarListaNueva={listarhv}
                >
                    </VerPerfil>}
            </div>
        </div>
        {abriracademico && datosMedico && (
            <ConsultarAcademico 
                abrir={abriracademico} 
                token={token} 
                nro_doc={datosMedico.usuario.nro_doc}
            />
    )}
        {abrirexperiencial && datosMedico && (
            <ConsultarExperienciaL
            openExperiencias={abrirexperiencial}
            token={token}
            nro_doc={datosMedico.usuario.nro_doc}
            />
        )}
    

        </>
    )

}

export default ListarHv