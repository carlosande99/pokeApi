import { Link } from "react-router-dom";
 
function PokemonReturn ({ location, nameData, visibleCount, setOffset , fetchPokemons}) {
    const loadMore = () => {
        setOffset(prevOffset => prevOffset + visibleCount);
    };
    return (
        <>
            <div key={'1'}>
                <h3 key={'1'} className='colorLetras'>
                    {
                        fetchPokemons ? (
                            "Pokédex Nacional"
                        ) : "Pokédex de la región de " + location.state
                    }
                </h3>
                <div className='pokemon-grid' key={'2'}>
                    {
                        nameData && nameData.length > 0 ? (
                            nameData.map((pokemon, index) => (
                                <Link state={pokemon.id} to={"/Dashboard/"+pokemon.name} key={index} className='colorLetras'>
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
                {
                    fetchPokemons ? (
                        <div id='divCargarMas' className='mb-2'>
                                <button onClick={fetchPokemons} id='cargarMas'>Cargar más Pokémon</button>
                        </div>
                    ) : 
                        <div id='divCargarMas' className='mb-2'>
                            <button onClick={loadMore} id='cargarMas'>Cargar más</button>
                        </div>
                }
            </div>
        </>
    );
}
export default PokemonReturn