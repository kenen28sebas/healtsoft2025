import React from "react";
import './sidebar.css'

const NavBarGerente = ({funcionabrir , funcioncerrar }) =>{
    return(
        <>
        <div className="sidebar">
            <div className="logo_content">
                <div className="logo">
                    <box-icon type='solid' name='donate-heart' color="#0b2997"></box-icon>
                    <div className="logo_nombre"><p className="kenayhealth">KenayHealthsoft</p></div>
                </div>
            </div>

            <div className="navbar">
                <div className="opciones">
                    <box-icon type='solid' name='home'></box-icon>
                    <span className="textoop">Inicio</span>
                </div>
                <div  onClick={funcionabrir} className="opciones">
                    <box-icon type='solid' name='clinic' width="20px" height="20px"></box-icon>
                    <span className="textoop">Gestionar Ips</span>
                </div>
                <div className="opciones">
                    <box-icon name='user-circle' type='solid'></box-icon>
                    <span className="textoop">Ver perfil</span>
                </div>
                <div onClick={funcioncerrar} className="opciones">
                    <box-icon name='door-open' type='solid' width="20px" height="20px"></box-icon>
                    <span className="textoop">Cerrar</span>
                </div>
            </div>
        </div>
        </>
    )
}

export default NavBarGerente