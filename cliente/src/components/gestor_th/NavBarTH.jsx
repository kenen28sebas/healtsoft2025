import React from "react"
import './barra.css'
// import './sidebar.css'


const NavBarTH = ({funcion , funcion2 , nombreuser }) => {
    return(
    <>
    <div className="barralateral">
        <div className="logo_contenido">
            <box-icon type='solid' name='donate-heart' className="logokenay"></box-icon>
            <h3 className="titulokeny">KenayHealthsoft</h3>
        </div>
        <div className="barragerente">
            <div className="opcionesgerente casita">
                <box-icon name='home' type='solid' className="logosnavbar" ></box-icon>
                <p className="opcionesnb">Inicio</p>
            </div>
            <div className="opcionesgerente gestion" onClick={funcion}>
                <box-icon type='solid' name='clinic' className="logosnavbar"></box-icon>
                <p className="opcionesnb">Gestionar hoja de vida</p>
            </div>
            <div className="opcionesgerente">
                <box-icon type='solid' name='user-circle' className="logosnavbar"></box-icon>
                <p className="opcionesnb">Ver perfil</p>
            </div>
            <div className="opcionesgerente" onClick={funcion2}>
                <box-icon name='door-open' type='solid' className="logosnavbar"></box-icon>
                <p className="opcionesnb">Cerrar</p>
            </div>
        </div>
    </div>
    </>
    )
    
}

export default NavBarTH