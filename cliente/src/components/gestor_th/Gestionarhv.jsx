import React, { useState } from "react";
import CrearHv from "./CrearHv";
import './barra.css'
import Buscar from "./Buscar";
import Academico from "./Academico";
import Experiencia from "./Experiencia";
import ListarHv from "./Listarhv";
const GestionarHv = ({isOpen , isClose , token , nro_doc_auxiliar}) =>{
    const [estado , setestado] = useState(null)
    const [abrirComp , setabrirComp] = useState(false)
    const [abrirexperiencial , setabrirexperiencial] = useState(false)
    const[abriracademicos , setabriracademicos] = useState(false)
    const [abrirlista , setabrirlista] = useState(false)
    const [abrirlistarhv , setabrirlistarhv] = useState(false)
    // const [abriractualizarhv ,setabriractualizarhv ] = useState(false)
    if (!isOpen){
        return null
    }
    if (! isClose){
        return null
    }
    function abrirformulario(){
        setestado(true)
        setabrirComp(false)
        setabriracademicos(false)
        setabrirlista(false)
        console.log(estado)
    }
    function cerrar (){
        setestado(false)
    }
    function abriracademicosb(){
        setabriracademicos(true)
        setestado(false)
        setabrirexperiencial(false)
        setabrirlista(false)
        setabrirlistarhv(false)
    }
    function abrirexperienciab(){
        setabrirexperiencial(true)
        setestado(false)
        setabriracademicos(false)
        setabrirlista(false)
        setabrirlistarhv(false)

    }
    function listar(){
        // setabrirlista(true)
        setabrirlistarhv(true)
        setabrirexperiencial(false)
        setestado(false)
        setabriracademicos(false)
        setabrirComp(false)
    }

    console.log(nro_doc_auxiliar)
    const documento_auxiliar = nro_doc_auxiliar
    return(
        <>
        <div className="barra2">
            <button onClick={abrirformulario}>Crear hoja de vida</button>
            {/* <button>Actualizar Hoja de vida</button> */}
            {/* <button onClick={cerrar}>Eliminar Hoja de vida</button> */}
            <button onClick={listar}>Listar Hojas de vida</button>
            <button onClick={abriracademicosb}>Registrar academicos</button>
            <button onClick={abrirexperienciab}>Registrar experiencias</button>
        </div>
        <CrearHv 
        token={token}
        abierto={estado}
        documento_auxiliar={documento_auxiliar}
        ></CrearHv>
        <Buscar abrir={abrirexperiencial} token={token}>
            <Experiencia></Experiencia>
        </Buscar>
        <Buscar abrir={abriracademicos} token={token}>
            <Academico></Academico>
        </Buscar>
        {/* <Buscar abrir={abrirlista} token={token}>
            <ListarHv></ListarHv>
        </Buscar> */}
        <ListarHv token={token} openlistarhv={abrirlistarhv}></ListarHv>
        </>
    )
}

export default GestionarHv