import React, { useState } from "react";
import CrearIps from "./CrearIps";
import CrearCargo from "./CrearCargo";
import CrearServicio from "./CrearServicio";
import ListarIps from "./ListarIps";
import ListarServicios from "./ListarServicios";
import ListarCargos from "./ListarCargos";

const GestionarIps = ({abrirOpciones,cerrarOpciones,token}) => {

    const [abrirFormIps , setabrirFormIps] = useState(null)
    const [abrirFormCargo , setabrirFormCargo] = useState(null)
    const [abrirFormServicio , setAbrirFormServicio] = useState(null)
    const [abrirListaIps , setAbrirlistaIps] = useState(null)
    const [abrirListaServicios , setAbrirlistaServicios] = useState(null)
    const [abrirListaCargos , setAbrirlistaCargos] = useState(null)

    function abrirformularioips(){
        setabrirFormIps(true)
    }
    function abrirformulariocargo(){
        setabrirFormIps(false)
        setabrirFormCargo(true)
    }
    function abrirformularioservicio(){
        setabrirFormIps(false)
        setabrirFormCargo(false)
        setAbrirFormServicio(true)
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
        <div className="barra2">
            <div onClick={abrirformularioips}><p>Crear Ips</p></div>
            <div onClick={abrirformulariocargo}><p>Crear Cargo</p></div>
            <div onClick={abrirformularioservicio}>Crear Servicio<p></p></div>
            <div onClick={abrirlistacargos}><p>Listar cargos</p></div>
            <div onClick={abrirlistips}><p>Listar ips</p></div>
            <div onClick={abrirlistaservicios}><p>Listar servicios</p></div>
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
        </>
        
    )
}

export default GestionarIps