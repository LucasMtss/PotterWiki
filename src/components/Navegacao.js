import React from 'react';
import { Link } from 'react-router-dom';

const Navegacao = () => {
    return (
        <div className='navegacao'>
            <Link to='/personagens' className='links'> Characters <br /> </Link>
            <Link to='/feiticos' className='links'> Spells <br /> </Link>
            <Link to='/casas' className='links'> Houses <br /> </Link>
        </div>
    )
}

export default Navegacao;