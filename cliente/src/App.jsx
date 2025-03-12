import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Registro from './components/registro'
import Login from './components/login'
import Overlay from './components/overley'
import './styles/index.css'
import { BrowserRouter , Route , Routes} from 'react-router-dom'
import Nabvar from './components/navbar'

import Dashboard from './components/Dashboard'

const App = () => {
  const [isActive, setIsActive] = useState(false);

  return (
    <>
    
    
      <BrowserRouter>
      <Routes>
        <Route path='/' element={
            <div className={`container ${isActive ? 'right-panel-active' : ''}`} id="container">
            <Registro />
            <Login />
            <Overlay onRegisterClick={() => setIsActive(true)} onLoginClick={() => setIsActive(false)} />
            </div>
        }/>
        <Route path="/prueba" element={<Nabvar/>} />
      </Routes>
    </BrowserRouter>
    
    </>
  );
};

export default App;