import React from 'react';
import ReactDOM from 'react-dom';
import Home from './Pages/Home';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import Personagens from './Pages/Personagens';
import Feiticos from './Pages/Feiticos';
import Casas from './Pages/Casas';


ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Home} />

      <Route exact path="/Home" component={Home} />

      <Route exact path="/Characters" component={Personagens} />

      <Route exact path="/Spells" component={Feiticos} />

      <Route exact path="/Houses" component={Casas} />
    </Switch>

  </BrowserRouter>,
  document.getElementById('root')
);


