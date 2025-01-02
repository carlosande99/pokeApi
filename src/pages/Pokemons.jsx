import { useLocation } from 'react-router-dom';
import React, { useState, useEffect } from "react";
import '../css/App.css';
import '../css/pokemon.css';
import { Pie } from './Pie';
import { Link } from "react-router-dom";

function Pokemons() {
    const location = useLocation();
    const [data, setData] = useState(null);
    const [pokedexData, setPokedexData] = useState(null);
    const [nameData, setNameData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [visibleCount] = useState(18);
    const [offset, setOffset] = useState(0);
    const [cantidadPoke, setCantidadPoke] = useState(0);

    useEffect(() => {
        document.documentElement.style.setProperty('--fondo-url', `url(/container_bg.png)`);
    })
    
    useEffect(() => {
        // Llamada a la API para obtener la región
        fetch("https://pokeapi.co/api/v2/region/" + location.state)
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Error en la solicitud");
                }
                return response.json();
            })
            .then((data) => {
                setData(data);
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            });
    }, [location.state]);

    useEffect(() => {
        if (!data || !data.pokedexes) return;

        const promises = data.pokedexes.map(entry => {
            const pokedex = entry.url;
            return fetch(pokedex)
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`Error en la solicitud para obtener la pokédex`);
                    }
                    return response.json();
                })
                .catch(error => {
                    console.error(`Error fetching para la pokedex: `, error);
                    return null;
                });
        });

        Promise.all(promises)
            .then(results => {
                const validResults = results.filter(result => result !== null);
                setPokedexData(validResults);
            })
            .catch(error => {
                console.error("Error en las promesas:", error);
                setError(error.message);
            });
    }, [data]);

    useEffect(() => {
        if (!pokedexData) return;

        const allPokemonEntries = pokedexData.flatMap(pokedex => 
            pokedex.pokemon_entries || []
        );

        // Filtrar entradas duplicadas por nombre de pokemon
        const uniqueEntries = Array.from(new Set(
            allPokemonEntries.map(entry => entry.pokemon_species.name)
        )).map(name => 
            allPokemonEntries.find(entry => entry.pokemon_species.name === name)
        );
        setCantidadPoke(uniqueEntries.length)
        // Cargar solo los Pokémon visibles
        const promises = uniqueEntries.slice(offset, offset + visibleCount).map(entry => {
            const pokemonName = entry.pokemon_species.name;
            const pokemonEspecie = entry.pokemon_species.url;

            return fetch(pokemonEspecie)
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`Error en la solicitud para ${pokemonName}`);
                    }
                    return response.json();
                })
                .catch(error => {
                    console.error(`Error fetching ${pokemonName}:`, error);
                    return null;
                });
        });

        Promise.all(promises)
            .then(results => {
                const validResults = results.filter(result => result !== null);
                const sortedResults = validResults.sort((a, b) => a.id - b.id);
                setNameData(prevNameData => [...prevNameData, ...sortedResults]);
            })
            .catch(error => {
                console.error("Error en las promesas:", error);
                setError(error.message);
            });
    }, [pokedexData, offset]);

    const loadMore = () => {
        setOffset(prevOffset => prevOffset + visibleCount);
    };

    if (loading) return <p>Cargando...</p>;
    if (error) return <p>Error: {error}</p>;
    if (!data || !pokedexData) return <p>Cargando datos de la Pokédex...</p>;
    if (!nameData) return <p>Cargando Datos...</p>;

    return (
        <>
            {
                pokedexData && pokedexData.length > 0 ? (
                    <div key={'1'}>
                        <h3 key={'1'}>Pokedex de la región de {location.state}:</h3>
                        <div className='pokemon-grid' key={'2'}>
                            {
                                nameData && nameData.length > 0 ? (
                                    nameData.map((pokemon, index) => (
                                        <Link state={pokemon.id} to="/Dashboard" key={index}>
                                            <div key={index} className='pokemon-card'>
                                                <img 
                                                    src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemon.id}.svg`}
                                                    alt={pokemon.name}
                                                    onError={(e) => {
                                                        e.target.onerror = null;
                                                        e.target.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`
                                                    }}
                                                    className='pokemon-image'
                                                />
                                                <p>{index + 1}. {pokemon.name}</p>
                                            </div>
                                        </Link>
                                    ))
                                ) : (
                                    <p>Cargando los Pokémon...</p>
                                )
                            }
                        </div>
                        {offset + visibleCount < cantidadPoke && (
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