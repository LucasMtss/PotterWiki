import React from 'react';
import { Link } from 'react-router-dom';

const Navegacao = (props) => {
    return (
        <nav className='navegacao'>
            <Link to={props.links[0]} className='links'> {props.botoes[0]} <br /> </Link>
            <Link to={props.links[1]} className='links'> {props.botoes[1]} <br /> </Link>
            {/* <Link to={props.links[2]} className='links'> {props.botoes[2]} <br /> </Link> */}
        </nav>
    )
}

export default Navegacao;