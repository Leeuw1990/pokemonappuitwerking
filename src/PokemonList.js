import React, {useEffect, useState} from "react";
import App from "./App";
import './PokemonList.css'
import axios from "axios";

function PokemonList({ name, currentPage }) {
    const [onePokemon, setOnePokemon] = useState({})
    const [abilities, setAbilities] = useState([]);
    const [moves, setMoves] = useState([]);

    async function singlePokemon() {
        try {
            const {data} = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`)
            console.log(data)
            setOnePokemon(data);
            setAbilities(data.abilities.length)
            setMoves(data.moves.length)

        } catch (e) {
            console.error(e)
            }
        }
    useEffect(() => {

        singlePokemon();

    }, [currentPage])

    return (
    <div className="List">
        <h3>{onePokemon.name}</h3>
        {onePokemon.sprites && <img src={onePokemon.sprites.front_default}/>}
        <p>Weight: {onePokemon.weight} lbs.</p>
        <p>Has {abilities} abilities.</p>
        <p>Has {moves} moves.</p>
    </div>
    )
}

export default PokemonList