import useNacional from '../hooks/useNacional';
import PokemonReturn from '../components/PokemonReturn';
import '../css/App.css';
import '../css/pokemon.css';
import { Pie } from './Pie';
import usePokeNacional from '../hooks/usePokeNacional';
import { useBackground } from '../hooks/useBackground';
import useAllPokemon from '../hooks/useAllPokemon';
function Nacional (){
    const {pokemons, loading, error, fetchPokemons} = useNacional()
    const {pokedexData} = usePokeNacional(pokemons)
    const {cantidadPoke, offset, setOffset, nameData, visibleCount} = useAllPokemon(pokedexData)

    useBackground()
    if (loading) return <p className='colorLetras'>Cargando...</p>;
    if (error) return <p className='colorLetras'>Error: {error}</p>;
    if(!pokemons) return <p className='colorLetras'>Cargando datos...</p>
    if(!pokedexData) return <p className='colorLetras'>Cargando datos...</p>
    return (
        <>
            {
                <PokemonReturn location={"Nacional"} nameData={nameData} offset={offset} visibleCount={visibleCount} cantidadPoke={cantidadPoke} setOffset={setOffset} fetchPokemons={fetchPokemons}/>
            }
            <Pie />
        </>
    );
}
export default Nacional;