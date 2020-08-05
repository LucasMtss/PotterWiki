import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import Personagens from './components/Personagens';
import Feiticos from './components/Feiticos';
import Casas from './components/Casas';


ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={App} />

      <Route exact path="/Home" component={App} />

      <Route exact path="/Characters" component={Personagens} />

      <Route exact path="/Spells" component={Feiticos} />

      <Route exact path="/Houses" component={Casas} />
    </Switch>

  </BrowserRouter>,
  document.getElementById('root')
);


