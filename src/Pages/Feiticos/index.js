import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './feiticos.css'
import brasao from '../../images/brasão.png';
import Navegacao from '../../Components/Navegacao';
import logo from '../../images/logoEditada.png';

function Feiticos() {

    const [dadosFeiticos, setDadosFeiticos] = useState(false);
    const [feiticos, setFeiticos] = useState([]);
    const [nomesFeiticos, setNomesFeiticos] = useState([])
    const [pesquisaFeitico, setPesquisaFeitico] = useState('')
    const [arrayFeiticos, setArrayFeiticos] = useState([])
    const [feiticoAll, setFeiticoAll] = useState([])
    const [feiticoSpell, setFeiticoSpell] = useState([])
    const [feiticoCharm, setFeiticoCharm] = useState([])
    const [feiticoEnchantment, setFeiticoEnchantment] = useState([])
    const [feiticoHex, setFeiticoHex] = useState([])
    const [feiticoCurse, setFeiticoCurse] = useState([])
    const [feiticoJinx, setFeiticoJinx] = useState([])


    let getDadosFeiticos = async () => {
        let res = await axios.get("https://www.potterapi.com/v1/spells", {
            params: {
                key: '$2a$10$TCvnyQmkvRjg/LHBQI5Snezq2FfP1QRNk.09sX4ZNEN98st34RWMi'
            }
        });
        setDadosFeiticos(res.data);
        console.log('feiticos: ', dadosFeiticos)

        for (let i = 0; i < res.data.length; i++) {
            //console.log(res.data[i].spell)
            nomesFeiticos.push(res.data[i].spell)
        }


        let array = []

        for (var i = 0; i < res.data.length; i++) {
            array.push(<ul className='cardFeitico'><div className='cabecalhoCard' ><img src={brasao} /></div> <li> <strong><u>Name: </u>{res.data[i].spell} </strong></li><li><u>Type: </u>{res.data[i].type} </li><li><u>Effect: </u>{res.data[i].effect}</li><div className='footerCard'></div></ul>)
        }


        setFeiticoAll(array)
        setArrayFeiticos(array)

    }

    useEffect(() => {
        getDadosFeiticos();
        selecionaFeitico()
    },
        []
    )

    function separaFeiticos(tipo, array) {
        //console.log(array.length, tipo)
        let arrayTipo = []

        for (var i = 0; i < array.length; i++) {
            if (array[i].type == tipo) {
                arrayTipo.push(array[i])
                // arrayTipo.push(array[i].type)
                // arrayTipo.push(array[i].effect)
            }
        }

        return arrayTipo
    }


    function montaCards(array) {
        let arrayCards = []
        for (var i = 0; i < array.length; i++) {
            arrayCards.push(<ul className='cardFeitico'><div className='cabecalhoCard' ><img src={brasao} /></div> <li> <strong><u>Name: </u>{array[i].spell} </strong></li><li><u>Type: </u>{array[i].type} </li><li><u>Effect: </u>{array[i].effect}</li><div className='footerCard'></div></ul>)
        }
        return arrayCards
    }

    //Pesquisa o personagem com o nome escolhido
    function pesquisaNome() {
        let array = []
        if (pesquisaFeitico == '') {
            for (var i = 0; i < dadosFeiticos.length; i++) {
                array.push(<ul className='cardFeitico'><div className='cabecalhoCard' ><img src={brasao} /></div> <li> <strong><u>Name: </u>{dadosFeiticos[i].spell} </strong></li><li><u>Type: </u>{dadosFeiticos[i].type} </li><li><u>Effect: </u>{dadosFeiticos[i].effect}</li><div className='footerCard'></div></ul>)
            }
            setArrayFeiticos(array)
        } else {

            let feitico = pessquisaParteDoNome(pesquisaFeitico)
            let indice = nomesFeiticos.indexOf(feitico)
            array.push(<ul className='cardFeitico'><div className='cabecalhoCard' ><img src={brasao} /></div> <li> <strong><i>Name: </i>{dadosFeiticos[indice].spell} </strong></li><li><i>Type: </i>{dadosFeiticos[indice].type} </li><li><i>Effect: </i>{dadosFeiticos[indice].effect}</li><div className='footerCard'></div></ul>)
            setArrayFeiticos(array)
        }
    }

    var mudaNome = (event) => {
        let nome = event.target.value
        nome = nome.toLowerCase().replace(/(?:^|\s)\S/g, function (a) { return a.toUpperCase(); })
        // https://pt.stackoverflow.com/questions/32086/converter-cada-primeira-letra-de-cada-palavra-em-maiu%CC%81sculas#:~:text=Explica%C3%A7%C3%A3o%3A,%C3%A0%20primeira%20letra%20da%20string
        setPesquisaFeitico(nome)
        pesquisaNome()
    }


    //Se o usuario digitar só uma paarte do nome, essa função procura pelo primeiro nome completo correspondente
    function pessquisaParteDoNome(nome) {
        for (let i = 0; i < nomesFeiticos.length; i++) {
            if (nomesFeiticos[i].indexOf(nome) >= 0)
                return nomesFeiticos[i]
        }
    }

    function selecionaFeitico() {
        // seta um array de cada tipo de feitiço, já pronto para renderizar com os cards prontos
        console.log('seleciona: ', dadosFeiticos);

        setFeiticoSpell(montaCards(separaFeiticos('Spell', dadosFeiticos)))
        setFeiticoCharm(montaCards(separaFeiticos('Charm', dadosFeiticos)))
        setFeiticoEnchantment(montaCards(separaFeiticos('Enchantment', dadosFeiticos)))
        setFeiticoHex(montaCards(separaFeiticos('Hex', dadosFeiticos)))
        setFeiticoCurse(montaCards(separaFeiticos('Curse', dadosFeiticos)))
        setFeiticoJinx(montaCards(separaFeiticos('Jinx', dadosFeiticos)))


        let tipo = document.getElementsByName('feitico')
        let feiticoSelecionado = 'all'
        for (let i = 0; i < tipo.length; i++) {
            if (tipo[i].checked)
                feiticoSelecionado = tipo[i].value
        }
        if (feiticoSelecionado !== 'all') {
            if (feiticoSelecionado == 'Charm')
                setArrayFeiticos(feiticoCharm)
            else
                if (feiticoSelecionado == 'Spell')
                    setArrayFeiticos(feiticoSpell)
                else
                    if (feiticoSelecionado == 'Enchantment')
                        setArrayFeiticos(feiticoEnchantment)
                    else
                        if (feiticoSelecionado == 'Curse')
                            setArrayFeiticos(feiticoCurse)
                        else
                            if (feiticoSelecionado == 'Hex')
                                setArrayFeiticos(feiticoHex)
                            else
                                if (feiticoSelecionado == 'Jinx')
                                    setArrayFeiticos(feiticoJinx)

        }
        else
            setArrayFeiticos(feiticoAll)

    }



    return (

        <div className='feiticos'>
            <img src={logo} className='logo' />
            <Navegacao botoes={['Characters', 'Home', 'Houses']} links={['/Characters', '/Home', '/Houses']} />
            <div className='pesquisa'>
                <input className='barraPesquisaFeitico' placeholder='Spell Name' onChange={mudaNome} />
                <button className='botaoPesquisar' onClick={pesquisaNome}>Search</button>
            </div>

            <div className='filtro'>
                <p>Filter by type</p>
                <input type='radio' name='feitico' value='all' tagName='all' />
                <label>All</label> <br />
                <input type='radio' name='feitico' value='Charm' tagName='Charm' />
                <label>Charm</label> <br />
                <input type='radio' name='feitico' value='Spell' tagName='Spell' />
                <label>Spell</label> <br />
                <input type='radio' name='feitico' value='Enchantment' tagName='Enchantment' />
                <label>Enchantment</label> <br />
                <input type='radio' name='feitico' value='Hex' tagName='Hex' />
                <label>Hex</label> <br />
                <input type='radio' name='feitico' value='Curse' tagName='Curse' />
                <label>Curse</label> <br />
                <input type='radio' name='feitico' value='Jinx' tagName='Jinx' />
                <label>Jinx</label> <br />
                <button className='botaoFiltrar' onClick={selecionaFeitico}>Filtrar</button>
            </div>


            <div className='divMaiorListaFeitico'>
                <div className='divMenorListaFeitico'>
                    {
                        arrayFeiticos
                    }
                </div>
            </div>
        </div>
    );
}


export default Feiticos;