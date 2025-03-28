import React from "react";
import { useState } from "react";
import "./calentadario_citas.css"
import Card_cita from "./Card_cita"
import Calendario_horas from "./Calendario_horas";

const Calendario_citas = ({isOpen , token}) =>{
    const [index, setIndex] = useState(0);
    const [open,setOpen] = useState(false);
    const [dia,setDia] = useState(null)

    if (!isOpen){return null}

    
    function handleOpen (dia){
        setOpen(true)
        setDia(dia)
        console.log(dia)
    };

    const handleClose = () => {
        setOpen(false); 
      };


    function handleSumaMes() {
      setIndex(index + 1);
    }
    function handleRestaMes() {
        setIndex(index - 1);
      }

      function generarDiasDelAño(anio) {
        const diasDelAño = Array.from({ length: 12 }, () => []); // Inicializa un arreglo de 12 meses
        const fechaInicio = new Date(anio, 0, 1); // 1 de enero
        const fechaFin = new Date(anio + 1, 0, 1); // 1 de enero del siguiente año
      
        for (let fecha = fechaInicio; fecha < fechaFin; fecha.setDate(fecha.getDate() + 1)) {
          const mesActual = fecha.getMonth();
      
          // Si es el primer día del mes, llena los días anteriores con `null`
          if (fecha.getDate() === 1) {
            const primerDiaSemana = fecha.getDay(); // Índice del primer día de la semana
            for (let i = 0; i < primerDiaSemana; i++) {
              diasDelAño[mesActual].push(null);
            }
          }
      
          // Agregar el día correspondiente
          diasDelAño[mesActual].push(new Date(fecha));
        }
      
        return diasDelAño;
      }
      
      // Prueba el código
      const dias = generarDiasDelAño(2025);
   
      const texto_meses = [
        "Enero",
        "Febrero",
        "Marzo",
        "Abril",
        "Mayo",
        "Junio",
        "Julio",
        "Agosto",
        "Septiembre",
        "Octubre",
        "Noviembre",
        "Diciembre"
      ];
      


    return(
        <>
        <div className="calendario">
            <button onClick={handleRestaMes}> {texto_meses[index - 1]} </button>
            <h1>{texto_meses[index]}</h1>
            <button onClick={handleSumaMes}> {texto_meses[index + 1]} </button>
            {!open && (
                <div className="calendario__contenedor">
                {dias[index].map(dias_card => {
                    if (dias_card == null) return <Card_cita dia={"*"} open={() => handleOpen()} />;
                    return <Card_cita dia={dias_card.getDate()} open={() => handleOpen(dias_card)} />;
                })}
                </div>
            )}    
            <Calendario_horas isOpenCH={open} isCloseCH={handleClose} token={token} dia={dia}></Calendario_horas>
        </div>
        
        
        </>

    )
    
}

export default Calendario_citas