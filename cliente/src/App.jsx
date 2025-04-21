import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Registro from './components/registro'
import Login from './components/login'
import Overlay from './components/overley'
import { BrowserRouter , Route , Routes} from 'react-router-dom'
import App_gestor_citas from './components/gestor_citas/App_gestor_citas'
import Dashboard from './components/Dashboard'
import AppGestorTh  from './components/gestor_th/AppGestorTh'
import CrearHv from './components/gestor_th/CrearHv'
import AppGerente from './components/gestor_th/gerente/AppGerente'

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
          <div className='jesus'>
            <div className={`container ${isActive ? 'right-panel-active' : ''}`} id="container">
            <Registro />
            <Login almacenarTokenp= {almacenarToken} />
            <Overlay onRegisterClick={() => setIsActive(true)} onLoginClick={() => setIsActive(false)} />
            </div>
          </div>
        }/>
        <Route path="/th" element={<AppGestorTh token= {token}/>}/>
        <Route path="/prueba" element={<App_gestor_citas token= {token}/>} />
        <Route path='/gerente' element={<AppGerente token={token}/>}/>
      </Routes>
    </BrowserRouter>
    
    </>
  );
};

export default App;