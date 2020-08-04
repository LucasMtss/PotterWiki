import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navegacao from './components/Navegacao';
import Personagens from './components/Personagens';
import Feiticos from './components/Feiticos';
import Casas from './components/Casas';
import './index.css'

import carta from './images/carta.png';
import logo from './images/Logo_Curiosidades_Magicas.png';



function App() {

  return (
    <Router>
      <div className='app'>
        <img src={logo} className='logoPrincipal' />

        <Navegacao />

        <Switch>
          <Route exact path="/personagens">
            <Personagens />
          </Route>

          <Route exact path="/feiticos">
            <Feiticos />
          </Route>

          <Route exact path="/casas">
            <Casas />
          </Route>
        </Switch>

        <h1 className='titulo'>Torne-se um bruxo!</h1>
        <img className='carta' src={carta} />


      </div>

    </Router>
  )
}

export default App;
