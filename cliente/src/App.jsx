import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Registro from './components/registro'
import Login from './components/login'
import Overlay from './components/overley'
import './styles/index.css'

const App = () => {
  const [isActive, setIsActive] = useState(false);

  return (
    <div className={`container ${isActive ? 'right-panel-active' : ''}`} id="container">
      <Registro />
      <Login />
      <Overlay onRegisterClick={() => setIsActive(true)} onLoginClick={() => setIsActive(false)} />
    </div>
  );
};

export default App;