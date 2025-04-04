import React from "react";
import './alerta.css'

const Alerta = ({isOpen,children}) => {
    if (!isOpen) return null;
    return(
        <>
        <div className="alerta">
            {children}
            <svg width="50px" height="50px" viewBox="0 0 24 24" fill="none">
            <g clip-path="url(#clip0_429_11249)">
                <path d="M20 7.00018L10 17.0002L5 12.0002" stroke="#23be04" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
            </g>
            <defs>
                <clipPath id="clip0_429_11249">
                <rect width="24" height="24" fill="white"/>
                </clipPath>
            </defs>
            </svg>
            <div className="alerta__linea"></div>
        </div>
        </>  
    )

}
export default Alerta