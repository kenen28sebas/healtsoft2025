import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Registro from './components/registro'
import Login from './components/login'
import Overlay from './components/overley'
import { BrowserRouter , Route , Routes} from 'react-router-dom'
import App_gestor_citas from './components/gestor_citas/App_gestor_citas'
import Dashboard from './components/Dashboard'
// import './styles/style.css'
// import { AppGestorTh } from './components/gestor_th/AppGestorTh'

const App = () => {
  const [isActive, setIsActive] = useState(false);
  const [token,setToken] = useState('ss')

  const almacenarToken = (dato) => {
    console.log("Token recibido del hijo:", dato);
    setToken(dato);
};


  return (
    <>
    
    
      <BrowserRouter>
      <Routes>
        <Route path='/' element={
            <div style={
              {
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "column",
                  fontFamily: "'Poppins', sans-serif",
                  overflow: "hidden",
                  height: "100vh",
              }}>
            <div className={`container ${isActive ? 'right-panel-active' : ''}`} id="container">
            <Registro />
            <Login almacenarTokenp= {almacenarToken} />
            <Overlay onRegisterClick={() => setIsActive(true)} onLoginClick={() => setIsActive(false)} />
            </div>
            </div>
        }/>
        <Route path="/prueba" element={<App_gestor_citas token= {token}/>} /> 
        {/* <Route path='/th' element={<AppGestorTh/>}/> */}
      </Routes>
    </BrowserRouter>
    
    </>
  );
};

export default App;