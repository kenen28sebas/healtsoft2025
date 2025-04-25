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
        setabrirlistarhv(false)
        console.log(estado)
        setabrirexperiencial(false)
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
        <div className="contenedorgestionips">
            <div className="barra2">
                <div className="opcionesgerente" onClick={abrirformulario}>
                    <box-icon type='solid' name='book-heart' className="logosnavbar"></box-icon>
                    <p className="opcionesnb">Crear hoja de vida</p>
                </div>
                <div className="opcionesgerente" onClick={listar}>
                    <box-icon type='solid' name='file-blank' className="logosnavbar"></box-icon>
                    <p className="opcionesnb">Listar Hojas de vida</p>
                </div>
                <div className="opcionesgerente" onClick={abriracademicosb}>
                    <box-icon name='add-to-queue' type='solid' className="logosnavbar"></box-icon>
                    <p className="opcionesnb">Registrar academicos</p>
                </div>
                <div className="opcionesgerente" onClick={abrirexperienciab}>
                    <box-icon name='list-ol' className="logosnavbar" ></box-icon>
                    <p className="opcionesnb">Registrar experiencia</p>
                </div>
            </div>
            <CrearHv 
            token={token}
            abierto={estado}
            documento_auxiliar={documento_auxiliar}
            ></CrearHv>
            <div className="divbuscarcomps">
                <Buscar abrir={abrirexperiencial} token={token}>
                    <Experiencia></Experiencia>
                </Buscar>
                <Buscar abrir={abriracademicos} token={token}>
                    <Academico></Academico>
                </Buscar>
            </div>
            <ListarHv token={token} openlistarhv={abrirlistarhv}></ListarHv>
        </div>
        </>
    )
}

export default GestionarHv