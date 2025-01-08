import { useLocation } from 'react-router-dom';
import '../css/App.css';
import '../css/pokemon.css';
import { Pie } from './Pie';
import { Link } from "react-router-dom";
import useApiRegion from "../hooks/useApiRegion";
import usePokedex from '../hooks/usePokedex';
import useAllPokemon from '../hooks/useAllPokemon';
import { useBackground } from '../hooks/useBackground';
function Pokemons() {
    const location = useLocation();
    const {data, loading, error} = useApiRegion(location.state);
    const {pokedexData} = usePokedex(data);
    const {cantidadPoke, offset, setOffset, nameData, visibleCount} = useAllPokemon(pokedexData)
    useBackground()
    
    const loadMore = () => {
        setOffset(prevOffset => prevOffset + visibleCount);
    };

    if (loading) return <p className='colorLetras'>Cargando...</p>;
    if (error) return <p className='colorLetras'>Error: {error}</p>;
    if (!data || !pokedexData) return <p className='colorLetras'>Cargando datos de la Pokédex...</p>;
    if (!nameData) return <p className='colorLetras'>Cargando Datos...</p>;

    return (
        <>
            {
                pokedexData && pokedexData.length > 0 ? (
                    <div key={'1'}>
                        <h3 key={'1'} className='colorLetras'>Pokedex de la región de {location.state}:</h3>
                        <div className='pokemon-grid' key={'2'}>
                            {
                                nameData && nameData.length > 0 ? (
                                    nameData.map((pokemon, index) => (
                                        <Link state={pokemon.id} to="/Dashboard" key={index} className='colorLetras'>
                                            <div key={index} className='pokemon-card'>
                                                <img 
                                                    src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemon.id}.svg`}
                                                    alt={pokemon.name}
                                                    onError={(e) => {
                                                        e.target.onerror = null;
                                                        e.target.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`
                                                    }}
                                                    className='pokemon-image'
                                                />
                                                <p>{index + 1}. {pokemon.name}</p>
                                            </div>
                                        </Link>
                                    ))
                                ) : (
                                    <p className='colorLetras'>Cargando los Pokémon...</p>
                                )
                            }
                        </div>
                        {offset + visibleCount <= cantidadPoke && (
                            <div id='divCargarMas'>
                                <button onClick={loadMore} id='cargarMas'>Cargar más</button>
                            </div>
                        )}
                    </div>
                ) : null
            }
            <Pie />
        </>
    );
}

export default Pokemons;