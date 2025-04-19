import React from "react";
const Mensaje = ({ closeModal , children  }) => (
    <div
      style={{
        position: 'fixed',
        top: '0',
        left: '0',
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0,0,0,0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: '1000',
      }}
    >
      <div
        style={{
          background: '#fff',
          padding: '20px',
          borderRadius: '10px',
          textAlign: 'center',
          fontFamily: "'Poppins', sans-serif",
        }}
      >
        {children}
        {/* <h2>Ya existe</h2>
        <p>El paciente que intentas registrar ya existe.</p> */}
        <button
          onClick={closeModal}
          style={{
            padding: '10px 20px',
            backgroundColor: '#008CBA',
            color: '#fff',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
        >
          Cerrar
        </button>
      </div>
    </div>
  );
 
export default Mensaje