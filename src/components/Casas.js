import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Casas() {

    const [dadosCasas, setDadosCasas] = useState(false);

    let getDadosCasas = async () => {
        let res = await axios.get("https://www.potterapi.com/v1/houses", {
            params: {
                key: '$2a$10$DmXn9VVc2vfTbAZlY2bGw.BlVOtIKKxuRZYpEvZ/.MCezaRx/aTii'
            }
        });
        console.log('Casas: ', res.data);
        setDadosCasas(res.data);
    }

    useEffect(() => {
        getDadosCasas();
    },
        []
    )

    const [dadosPersonagens, setDadosPersonagens] = useState(false);

    let getDadosPersonagens = async () => {
        let res = await axios.get("https://www.potterapi.com/v1/characters", {
            params: {
                key: '$2a$10$DmXn9VVc2vfTbAZlY2bGw.BlVOtIKKxuRZYpEvZ/.MCezaRx/aTii'
            }
        });
        console.log('Personagens: ', res.data);
        setDadosPersonagens(res.data);
    }

    useEffect(() => {
        getDadosPersonagens();
    },
        []
    )



    var casas = [];

    for (var i = 0; i < dadosCasas.length; i++) {
        casas.push(<dt key={dadosCasas[i]._id} > <strong> {dadosCasas[i].name} </strong> </dt>)
        casas.push(<dd> Values: {dadosCasas[i].values[0]}, {dadosCasas[i].values[1]}, {dadosCasas[i].values[2]}, {dadosCasas[i].values[3]} </dd>)
        casas.push(<dd> Colors: {dadosCasas[i].colors[0]}, {dadosCasas[i].colors[1]}</dd>)
        casas.push(<dd> Founder: {dadosCasas[i].founder} </dd>)
        casas.push(<dd> Head of House: {dadosCasas[i].headOfHouse} </dd>)
        casas.push(<dd> House Ghost: {dadosCasas[i].houseGhost} </dd>)
        casas.push(<dd> Mascot: {dadosCasas[i].mascot} <br /> </dd>)

        casas.push(<dd> Members: </dd>)
        for (var j = 0; j < 50; j++) {
            for (var k = 0; k < dadosPersonagens.length; k++) {
                if (dadosCasas[i].members[j] === dadosPersonagens[k]._id) {
                    casas.push(<dd><dd> {dadosPersonagens[k].name} </dd></dd>);
                }
            }
        }
        casas.push(<dd> <br /> <br /> </dd>)
    }

    return (
        <div>
            <h3> Casas </h3>
            <hr />
            <dl>
                {
                    casas
                }
            </dl>
        </div>
    );

}

export default Casas;

// function pegaNome(id) {
//     //pesquisa o id no array para pegar o nome que está na posição do id + 1
//     let posicao = nomesPersonagens.indexOf(id)
//     return nomesPersonagens[posicao + 1]
// }