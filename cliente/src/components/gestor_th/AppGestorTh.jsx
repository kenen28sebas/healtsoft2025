import { useState } from "react"

const AppGestorTh = (token) => {
    const [datos , setDatos] = useState (null)
    const url = "http://127.0.0.1:8000/perfil"
    const header = {
        'Content-Type' : 'aplication/json',
        'Authorization' : `Token ${token.token}`
    }
    const cargarDatos = async () =>{
        try{
            const response = await fetch(url,
                {
                    method : 'POST',
                    headers : header

                }
            );
        }
    }
}