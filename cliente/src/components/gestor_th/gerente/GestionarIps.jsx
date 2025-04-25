import React, { useState } from "react";
import CrearIps from "./CrearIps";
import CrearCargo from "./CrearCargo";
import CrearServicio from "./CrearServicio";
import ListarIps from "./ListarIps";
import ListarServicios from "./ListarServicios";
import ListarCargos from "./ListarCargos";
import './subbarra.css'

const GestionarIps = ({abrirOpciones,cerrarOpciones,token}) => {

    const [abrirFormIps , setabrirFormIps] = useState(null)
    const [abrirFormCargo , setabrirFormCargo] = useState(null)
    const [abrirFormServicio , setAbrirFormServicio] = useState(null)
    const [abrirListaIps , setAbrirlistaIps] = useState(null)
    const [abrirListaServicios , setAbrirlistaServicios] = useState(null)
    const [abrirListaCargos , setAbrirlistaCargos] = useState(null)
    

    function abrirformularioips(){
        setabrirFormIps(true)
        setabrirFormCargo(false)
        setAbrirFormServicio(false)
        setAbrirlistaIps(false)
        setAbrirlistaIps(false)
        setAbrirlistaServicios(false)
        setAbrirlistaCargos(false)
    }
    function abrirformulariocargo(){
        setabrirFormIps(false)
        setabrirFormCargo(true)
        setAbrirFormServicio(false)
        setAbrirlistaIps(false)
        setAbrirlistaIps(false)
        setAbrirlistaServicios(false)
        setAbrirlistaCargos(false)
    }
    function abrirformularioservicio(){
        setabrirFormIps(false)
        setabrirFormCargo(false)
        setAbrirFormServicio(true)
        setAbrirlistaIps(false)
        setAbrirlistaIps(false)
        setAbrirlistaServicios(false)
        setAbrirlistaCargos(false)
    }
    function abrirlistips(){
        setabrirFormIps(false)
        setabrirFormCargo(false)
        setAbrirFormServicio(false)
        setAbrirlistaCargos(false)
        setAbrirlistaServicios(false)
        setAbrirlistaIps(true)
    }
    function abrirlistaservicios(){
        setabrirFormIps(false)
        setabrirFormCargo(false)
        setAbrirFormServicio(false)
        setAbrirlistaIps(false)
        setAbrirlistaCargos(false)
        setAbrirlistaIps(false)
        setAbrirlistaServicios(true)
    }
    function abrirlistacargos(){
        setabrirFormIps(false)
        setabrirFormCargo(false)
        setAbrirFormServicio(false)
        setAbrirlistaIps(false)
        setAbrirlistaServicios(false)
        setAbrirlistaCargos(true)
    }
    if (!abrirOpciones){
        return null
    }
    if (!cerrarOpciones){
        return null
    }
    return(
        <>
        <div className="contenedorgestionips">
            <div className="barra2">
                <div onClick={abrirformularioips} className="opcionesgerente">
                    <box-icon type='solid' name='book-heart' className="logosnavbar"></box-icon>
                    <p className="opcionesnb">Crear Ips</p></div>
                <div onClick={abrirformulariocargo} className="opcionesgerente">
                    <box-icon type='solid' name='file-blank' className="logosnavbar"></box-icon>
                    <p className="opcionesnb">Crear Cargo</p></div>
                <div onClick={abrirformularioservicio} className="opcionesgerente">
                    <box-icon name='add-to-queue' type='solid' className="logosnavbar"></box-icon>
                    <p className="opcionesnb">Crear Servicio</p></div>
                <div onClick={abrirlistacargos} className="opcionesgerente">
                    <box-icon name='list-ul' ></box-icon>
                    <p className="opcionesnb">Listar cargos</p></div>
                <div onClick={abrirlistips} className="opcionesgerente">
                    <box-icon name='list-ol' className="logosnavbar" ></box-icon>
                    <p className="opcionesnb">Listar ips</p></div>
                <div onClick={abrirlistaservicios} className="opcionesgerente">
                    <box-icon name='list-plus' className="logosnavbar"></box-icon>
                    <p className="opcionesnb">Listar servicios</p></div>
            </div>
            <CrearIps
            token={token}
            abrirform={abrirFormIps}/>
            <CrearCargo 
            token={token}
            abrirFormularioCrgo={abrirFormCargo}/>
            <CrearServicio
            token={token}
            abrirformularioservicio={abrirFormServicio}/>
            <ListarIps
            token={token}
            abrirListaIps={abrirListaIps}/>
            <ListarServicios token={token} abrirlistaservicios={abrirListaServicios}/>
            <ListarCargos token={token} abrirlistacargos={abrirListaCargos}/>
        </div>
        </>
        
    )
}

export default GestionarIps