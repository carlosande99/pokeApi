import { useLocation } from 'react-router-dom';
import '../css/App.css';
import '../css/pokemon.css';
import { Pie } from './Pie';
import useApiRegion from "../hooks/useApiRegion";
import usePokedex from '../hooks/usePokedex';
import useAllPokemon from '../hooks/useAllPokemon';
import { useBackground } from '../hooks/useBackground';
import PokemonReturn from '../components/PokemonReturn';

function Pokemons() {
    const location = useLocation();
    const {data, loading, error} = useApiRegion(location.state);
    const {pokedexData} = usePokedex(data);
    const {setOffset, nameData, visibleCount} = useAllPokemon(pokedexData)
    useBackground()

    if (loading) return <p className='colorLetras'>Cargando...</p>;
    if (error) return <p className='colorLetras'>Error: {error}</p>;
    if (!data || !pokedexData) return <p className='colorLetras'>Cargando datos de la Pokédex...</p>;
    if (!nameData) return <p className='colorLetras'>Cargando Datos...</p>;

    return (
        <>
            {
                pokedexData && pokedexData.length > 0 ? (
                    <PokemonReturn location={location} nameData={nameData} visibleCount={visibleCount} setOffset={setOffset}/>
                ) : null
            }
            <Pie />
        </>
    );
}

export default Pokemons;