import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navegacao from './components/Navegacao';
import './index.css'

import carta from './images/carta.png';
import logo from './images/logoEditada.png';



function App() {

  return (

    <div className='app'>
      <img src={logo} className='logoPrincipal' />
      <Navegacao botoes={['Characters', 'Spells', 'Houses']} links={['/Characters', '/Spells', '/Houses']} />
      <h1 className='titulo'>Torne-se um bruxo!</h1>
      <img className='carta' src={carta} />


    </div>


  )
}

export default App;
