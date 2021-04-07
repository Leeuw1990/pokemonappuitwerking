import React, {useEffect, useState} from 'react';
import './App.css';
import PokemonList from "./PokemonList";
import PokemonEmblem from './assets/Pokemon-Emblem.jpg'
import axios from "axios";

function App() {
    const [pokemon, setPokemon] = useState([]);
    const [error, setError] = useState('');
    const [loading, toggleLoading] = useState(false);
    const [nextPage, setNextPage] = useState('');
    const [prevPage, setPrevPage] = useState('');
    const [currentPage, setCurrentPage] = useState(`https://pokeapi.co/api/v2/pokemon/?offset=0&limit=20`);

    function goToNextPage() {
        setCurrentPage(nextPage);
    }

    function goToPrevPage() {
        setCurrentPage(prevPage);
    }



    useEffect(() => {
        setError('');
        toggleLoading(true);

    async function pokemon() {
        try {
            const { data } = await axios.get(currentPage)
            setPokemon(data.results);
            setNextPage(data.next);
            setPrevPage(data.previous);

        } catch (e) {
            setError("Er is iets mis gegeaan!")
            console.error(e)
        }
        toggleLoading(false);

    }
        pokemon();

    }, [currentPage]);


  return (
        <>
            <img className='PokemonEmblem' src={PokemonEmblem} alt='PokemonEmblem'/>

            <div className='oneButton'>
            <button type='button'  className='pageButton'  onClick={goToPrevPage}>Previous</button>
            <button type='button'  className='pageButton'  onClick={goToNextPage}>Next</button>
            </div>

            <div className="pokemonCard">
                {error && <p>{error}</p>}
                {loading && <p>Pagina wordt geladen!</p>}

                {pokemon && pokemon.map (( pokemon ) => {

                return <PokemonList name={pokemon.name} currentPage={currentPage}/>
          })}
            </div>

            <div className='oneButton'>
                <button type='button'  className='pageButton' onClick={goToPrevPage}>Previous</button>
                <button type='button'  className='pageButton' onClick={goToNextPage}>Next</button>
            </div>

        </>
  );
}


export default App;
