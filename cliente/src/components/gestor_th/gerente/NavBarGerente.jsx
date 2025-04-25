import React from "react";
import './sidebar.css'

const NavBarGerente = ({funcionabrir , funcioncerrar }) =>{
    return(
        <>
        <div className="barralateral">
            <div className="logo_contenido">
                <box-icon type='solid' name='donate-heart' color="#0b2997" className="logokenay"></box-icon>
                <h3 className="titulokeny">KenayHeathsoft</h3>
            </div>
            <div className="barragerente">
                <div className="opcionesgerente casita">
                    <box-icon type='solid' name='home' className="logosnavbar"></box-icon>
                    <p className="opcionesnb">Inicio</p>
                </div>

                <div className="opcionesgerente" onClick={funcionabrir}>
                    <box-icon type='solid' name='clinic' className="logosnavbar"></box-icon>
                    <p className="opcionesnb">Gestionar Ips</p>
                </div>

                <div className="opcionesgerente">
                    <box-icon name='user-circle' type='solid' className="logosnavbar"></box-icon>
                    <p className="opcionesnb">Ver perfil</p>
                </div>

                <div className="opcionesgerente" onClick={funcioncerrar}>
                    <box-icon name='door-open' type='solid' className="logosnavbar"></box-icon>
                    <p className="opcionesnb">Cerrar</p>
                </div>
            </div>
        </div>
        </>
    )
}

export default NavBarGerente