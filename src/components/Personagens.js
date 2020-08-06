import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../src/personagens.css'
import brasao from '../images/brasão.png';
import Navegacao from './Navegacao';
import logo from '../images/logoEditada.png';
import '../personagens.css';

function Personagem() {

    const [dadosPersonagens, setDadosPersonagens] = useState(false)
    const [parametros, setParametros] = useState({ key: '$2a$10$TCvnyQmkvRjg/LHBQI5Snezq2FfP1QRNk.09sX4ZNEN98st34RWMi' })
    const [nomesPersonagens, setNomesPersonagens] = useState([])
    const [listaPersonagens, setListaPersonagens] = useState([])
    const [pesquisaPersonagem, setPesquisaPersonagem] = useState('')
    // Arrays que guardam cards de casas específicas
    const [grifinoria, setGrifinoria] = useState([])
    const [Corvinal, setCorvinal] = useState([])
    const [sonserina, setSonserina] = useState([])
    const [ufaLufa, setUfaLufa] = useState([])
    // Array com cards de todas as casas
    const [allHouses, setAllHouses] = useState([])
    var dados = []

    let getDadosPersonagens = async (parametros) => {

        // Fazendo requisição dos personagens para a API
        let res = await axios.get('https://www.potterapi.com/v1/characters', {
            params: parametros
        });
        // Armazenando os dados retornados da API em uma variável
        setDadosPersonagens(res.data);

        // cria um array com os nomes dos personagens para utilizar nas buscas
        // se a lista de nomes está vazia, ele pega os nomes da API, para não correr o risco de pegar os nomes duas vezes

        for (var i = 0; i < res.data.length; i++) {
            nomesPersonagens.push(res.data[i].name)
        }

        // for para pegar os dados de cada personagem e colocar no array, que já está montado com os cards
        var array = []
        for (var i = 0; i < res.data.length; i++) {

            array.push(<ul className='cardPersonagem'><div className='cabecalhoCard' ><img src={brasao} /></div><li className='nome'><strong><u>Nome:</u> {res.data[i].name}</strong></li><li><u>House: </u>{res.data[i].house}</li><li><u>Blood status: </u>{res.data[i].bloodStatus}</li><li><u>Boogart: </u>{res.data[i].boogart}</li><li><u>Death eater: </u>{res.data[i].deathEater}</li><li><u>Dumbledore's army: </u>{res.data[i].dumbledoresArmy}</li><li><u>Ministry of magic: </u>{res.data[i].ministryOfMagic}</li><li><u>Order of the Phoenix: </u>{res.data[i].orderOfThePhoenix}</li><li><u>Patronus: </u>{res.data[i].patronus}</li><li><u>Role: </u>{res.data[i].role}</li><li><u>School: </u>{res.data[i].school}</li><li><u>Species: </u>{res.data[i].species}</li><li><u>Alias: </u>{res.data[i].alias}</li><li><u>Wand: </u>{res.data[i].wand}</li><li className='animagus'><u>Animagus: </u>{res.data[i].animagus}</li><div className='footerCard'></div></ul >)
        }

        // Lista que será renderizada (já começa com dados de todos os personagens)
        setListaPersonagens(array)
        setAllHouses(array)
    }

    useEffect(() => {
        getDadosPersonagens(parametros)
        selecionaCasa()
    }, [])


    // Função para que recebe um array com todos os personagens e uma indicação de qual casa ela precisa separar
    function separaCasas(casa, array) {
        let arrayCasa = []
        if (casa == 'all') {
            for (let i = 0; i < array.length; i++) {
                arrayCasa.push(array[i])
            }
        } else {
            for (let i = 0; i < dadosPersonagens.length; i++) {
                if (dadosPersonagens[i].house == casa)
                    arrayCasa.push(dadosPersonagens[i])
            }
        }
        return arrayCasa
    }

    // Função para montar um array com cards de personagens de cada casa
    function montaCardsPersonagens(array) {
        let arrayCards = []
        for (let i = 0; i < array.length; i++)
            arrayCards.push(<ul className='cardPersonagem'><div className='cabecalhoCard' ><img src={brasao} /></div><li className='nome'><strong><u>Nome:</u> {array[i].name}</strong></li><li><u>House: </u>{array[i].house}</li><li><u>Blood status: </u>{array[i].bloodStatus}</li><li><u>Boogart: </u>{array[i].boogart}</li><li><u>Death eater: </u>{array[i].deathEater}</li><li><u>Dumbledore's army: </u>{array[i].dumbledoresArmy}</li><li><u>Ministry of magic: </u>{array[i].ministryOfMagic}</li><li><u>Order of the Phoenix: </u>{array[i].orderOfThePhoenix}</li><li><u>Patronus: </u>{array[i].patronus}</li><li><u>Role: </u>{array[i].role}</li><li><u>School: </u>{array[i].school}</li><li><u>Species: </u>{array[i].species}</li><li><u>Alias: </u>{array[i].alias}</li><li><u>Wand: </u>{array[i].wand}</li><li className='animagus'><u>Animagus: </u>{array[i].animagus}</li><div className='footerCard'></div></ul >)
        return arrayCards
    }

    // Função que pega a casa selecionada no  filtro e troca a lista de renderização para a casa selecionada
    function selecionaCasa() {
        // Separando os personagens por casas
        setGrifinoria(montaCardsPersonagens(separaCasas('Gryffindor', dadosPersonagens)))
        setCorvinal(montaCardsPersonagens(separaCasas('Ravenclaw', dadosPersonagens)))
        setSonserina(montaCardsPersonagens(separaCasas('Slytherin', dadosPersonagens)))
        setUfaLufa(montaCardsPersonagens(separaCasas('Hufflepuff', dadosPersonagens)))
        setAllHouses(montaCardsPersonagens(separaCasas('all', dadosPersonagens)))

        // Pega todos os inputs radio e verifica qual foi selecionado
        let casas = document.getElementsByName('casa')
        let casaSelecionada = 'all'
        for (let i = 0; i < casas.length; i++) {
            if (casas[i].checked)
                casaSelecionada = casas[i].value
        }
        if (casaSelecionada === 'all')
            setListaPersonagens(allHouses)
        else {
            if (casaSelecionada === 'Gryffindor')
                setListaPersonagens(grifinoria)
            else
                if (casaSelecionada === 'Ravenclaw')
                    setListaPersonagens(Corvinal)
                else
                    if (casaSelecionada === 'Slytherin')
                        setListaPersonagens(sonserina)
                    else
                        if (casaSelecionada === 'Hufflepuff')
                            setListaPersonagens(ufaLufa)
        }
    }

    //Pesquisa o personagem com o nome escolhido
    function pesquisaNome() {
        let array = []
        // Se nenhum nome for passado, mostra todos os personagens
        if (pesquisaPersonagem == '') {
            setListaPersonagens(allHouses)
        } else {
            // Usa o indexOf para encontrar o índice correspodente ao nome do personagem fornecido (se for diferente de -1 é porque achou o nome no array)
            let personagem = pessquisaParteDoNome(pesquisaPersonagem)
            let indice = nomesPersonagens.indexOf(personagem)
            if (indice != -1) {
                array.push(<ul className='cardPersonagem'><div className='cabecalhoCard' ><img src={brasao} /></div><li className='nome'><strong><u>Nome:</u> {dadosPersonagens[indice].name}</strong></li><li><u>House: </u>{dadosPersonagens[indice].house}</li><li><u>Blood status: </u>{dadosPersonagens[indice].bloodStatus}</li><li><u>Boogart: </u>{dadosPersonagens[indice].boogart}</li><li><u>Death eater: </u>{dadosPersonagens[indice].deathEater}</li><li><u>Dumbledore's army: </u>{dadosPersonagens[indice].dumbledoresArmy}</li><li><u>Ministry of magic: </u>{dadosPersonagens[indice].ministryOfMagic}</li><li><u>Order of the Phoenix: </u>{dadosPersonagens[indice].orderOfThePhoenix}</li><li><u>Patronus: </u>{dadosPersonagens[indice].patronus}</li><li><u>Role: </u>{dadosPersonagens[indice].role}</li><li><u>School: </u>{dadosPersonagens[indice].school}</li><li><u>Species: </u>{dadosPersonagens[indice].species}</li><li><u>Alias: </u>{dadosPersonagens[indice].alias}</li><li><u>Wand: </u>{dadosPersonagens[indice].wand}</li><li className='animagus'><u>Animagus: </u>{dadosPersonagens[indice].animagus}</li><div className='footerCard'></div></ul >)
                setListaPersonagens(array)
            }
        }
    }

    // Muda o nome a ser pesquisado pelo onChange da barra de pesquisa
    var mudaNome = (event) => {
        let nome = event.target.value
        nome = nome.toLowerCase().replace(/(?:^|\s)\S/g, function (a) { return a.toUpperCase(); })
        // https://pt.stackoverflow.com/questions/32086/converter-cada-primeira-letra-de-cada-palavra-em-maiu%CC%81sculas#:~:text=Explica%C3%A7%C3%A3o%3A,%C3%A0%20primeira%20letra%20da%20string
        setPesquisaPersonagem(nome)
        pesquisaNome()
    }


    //Se o usuario digitar só uma paarte do nome, essa função procura pelo primeiro nome completo correspondente
    function pessquisaParteDoNome(nome) {
        for (let i = 0; i < nomesPersonagens.length; i++) {
            if (nomesPersonagens[i].indexOf(nome) >= 0)
                return nomesPersonagens[i]
        }
    }

    return (
        <div className='personagens'>
            <img src={logo} className='logo' />
            <Navegacao botoes={['Spells', 'Home', 'Houses']} links={['/Spells', '/Home', '/Houses']} />
            <div className='pesquisa'>
                <input className='barraPesquisa' placeholder='Character name' onChange={mudaNome} />
                <button className='botaoPesquisar' onClick={pesquisaNome}>Pesquisar</button>
            </div>

            <div className='filtro'>
                <p>Filter by house</p>
                <input type='radio' name='casa' value='all' tagName='all' />
                <label>All</label> <br />
                <input type='radio' name='casa' value='Gryffindor' tagName='Grifinória' />
                <label>Gryffindor</label> <br />
                <input type='radio' name='casa' value='Ravenclaw' tagName='Corvinal' />
                <label>Ravenclaw</label> <br />
                <input type='radio' name='casa' value='Slytherin' tagName='Sonserina' />
                <label>Slytherin</label> <br />
                <input type='radio' name='casa' value='Hufflepuff' tagName='Lufa-lufa' />
                <label>Hufflepuff</label> <br />
                <button className='botaoFiltrar' onClick={selecionaCasa}>Filter</button>
            </div>

            <div className='divMaiorLista'>
                <p>* Alguns personagens possuem campos vazios pois as informações são desconhecidas ou inexistentes.</p>
                <div className='divMenorLista'>

                    {
                        listaPersonagens
                    }

                </div>
            </div>
        </div >
    )
}

export default Personagem