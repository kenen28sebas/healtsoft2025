import React from "react"
import './barra.css'


const NavBarTH = ({funcion , funcion2 , nombreuser }) => {
    return(
    <>
    <div className="sidebargestorth">
        <div className="info_content">
            <div className="logoth">
                <box-icon type='solid' name='donate-heart'></box-icon>
                <h3>KenayHealthsoft</h3>
            </div>
        </div>
        <div className="navbarth">
            <div className="opcionth">
                <box-icon name='home' type='solid' ></box-icon>
                <p>Inicio</p>
            </div>
            <div className="opcionth">
                <box-icon type='solid' name='file'></box-icon>
                <p>Gestionar hoja de vida</p>
            </div>
            <div className="opcionth">
                <box-icon type='solid' name='user-circle'></box-icon>
                <p>Ver perfil</p>
            </div>
            <div className="opcionth">
                
            </div>
        </div>
    </div>
    <div className="barra">
        <button>Inicio</button>
        <button onClick={funcion}>Gestionar Hojas de vida</button>
        <button>Ver perfil</button>
        <button>Gestionar personal</button>
        <button onClick={funcion2}>Cerrar</button>
        <p>{nombreuser}</p>
    </div>
    </>
    )
    
}

export default NavBarTH