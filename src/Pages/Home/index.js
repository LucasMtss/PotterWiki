import React from 'react';
import Navegacao from '../../Components/Navegacao';
import './home.css'

import carta from '../../images/carta.png';
import logo from '../../images/logoEditada.png';

function Home() {

  return (

    <div className='app'>
      <img src={logo} className='logoPrincipal' />
      <Navegacao botoes={['Characters', 'Spells', 'Houses']} links={['/Characters', '/Spells', '/Houses']} />
      <h1 className='titulo'>Torne-se um bruxo!</h1>
      <img className='carta' src={carta} />

    </div>


  )
}

export default Home;
