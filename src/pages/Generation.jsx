import { useBackground } from '../hooks/useBackground';
import { useLocation } from 'react-router-dom';
import useGeneration from '../hooks/useGeneration';
import PokemonReturn from '../components/PokemonReturn';
import useAllPokemon from '../hooks/useAllPokemon';
import '../css/App.css';
import '../css/pokemon.css';
import { Pie } from './Pie';
function Generation (){
    useBackground()
    const location = useLocation();
    const {generation, loading, error} = useGeneration(location.state ? location.state : null);
    const {setOffset, nameData, visibleCount} = useAllPokemon(generation, location.state)

    if (loading) return <p className='colorLetras'>Cargando...</p>;
    if (error) return <p className='colorLetras'>Error: {error}</p>;
    if(!nameData) return <p className='colorLetras'>Cargando Datos....</p>;
    return (
        <>
            {
                nameData && nameData.length > 0 ? (
                    <PokemonReturn generacion={generation.id} nameData={nameData} visibleCount={visibleCount} setOffset={setOffset}/>
                ) : null
            }
            <Pie />
        </>
    )   
}
export default Generation