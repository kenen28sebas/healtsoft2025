import React from "react";
import "./navbar.css"


const Nabvar = ({children}) => {
    return(
        <>
        <div className="navbar">
            {children}
        </div>
        </>
    )
}

export default Nabvar