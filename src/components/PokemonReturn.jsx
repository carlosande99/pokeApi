import { Link } from "react-router-dom";
 
function PokemonReturn ({ location, nameData, visibleCount, setOffset , fetchPokemons, generacion}) {
    const loadMore = () => {
        setOffset(prevOffset => prevOffset + visibleCount);
    };
    return (
        <>
            <div key="pokemon-container">
                <h3 key="pokedex-title" className='colorLetras'>
                    {
                        fetchPokemons ? (
                            "Pokédex Nacional"
                        ) : 
                            generacion !== null ? (
                                "Pokemons de la generacion "+generacion
                            ) : 
                                "Pokédex de la región de " + location.state
                    }
                </h3>
                <div className='pokemon-grid' key="pokemon-grid">
                    {
                        nameData && nameData.length > 0 ? (
                            nameData.map((pokemon, index) => (
                                <Link state={pokemon.id} to={"/Dashboard/"+pokemon.name} key={`pokemon-link-${pokemon.id}`} className='colorLetras'>
                                    <div key={`pokemon-card-${pokemon.id}`} className='pokemon-card'>
                                        <img 
                                            key={`pokemon-img-${pokemon.id}`}
                                            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemon.id}.svg`}
                                            alt={pokemon.name}
                                            onError={(e) => {
                                                e.target.onerror = null;
                                                e.target.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`
                                            }}
                                            className='pokemon-image'
                                        />
                                        <p key={`pokemon-name-${pokemon.id}`}>{index + 1}. {pokemon.name}</p>
                                    </div>
                                </Link>
                            ))
                        ) : (
                            <p key="loading-message" className='colorLetras'>Cargando los Pokémon...</p>
                        )
                    }
                </div>
                {
                    fetchPokemons ? (
                        <div key="load-more-national" id='divCargarMas' className='mb-2'>
                                <button onClick={fetchPokemons} id='cargarMas'>Cargar más Pokémon</button>
                        </div>
                    ) : 
                        <div key="load-more-regional" id='divCargarMas' className='mb-2'>
                            <button onClick={loadMore} id='cargarMas'>Cargar más</button>
                        </div>
                }
            </div>
        </>
    );
}
export default PokemonReturn