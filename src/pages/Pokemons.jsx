import { useLocation } from 'react-router-dom';
import React, { useState, useEffect } from "react";
import '../App.css';
import { Pie } from './Pie';
import { Link } from "react-router-dom";
function Pokemons() {
    const location = useLocation();
    const [data, setData] = useState(null);
    const [pokedexData, setPokedexData] = useState(null);
    const [nameData, setNameData] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Llamada a la API
        fetch("https://pokeapi.co/api/v2/region/"+location.state)
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
        if(!data || !data.pokedexes) return;

        const promises = data.pokedexes.map(entry => {
            const pokedex = entry.url;
            
            return fetch(pokedex)
                .then(response => {
                    if(!response.ok) {
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

        // Obtenemos todos los pokemon_entries de todas las pokedex
        const allPokemonEntries = pokedexData.flatMap(pokedex => 
            pokedex.pokemon_entries || []
        );
    
        // Filtrar entradas duplicadas por nombre de pokemon
        const uniqueEntries = Array.from(new Set(
            allPokemonEntries.map(entry => entry.pokemon_species.name)
        )).map(name => 
            allPokemonEntries.find(entry => entry.pokemon_species.name === name)
        );
    
        const promises = uniqueEntries.map(entry => {
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
                // Ordenar por ID para mantener el orden correcto
                const sortedResults = validResults.sort((a, b) => a.id - b.id);
                setNameData(sortedResults);
            })
            .catch(error => {
                console.error("Error en las promesas:", error);
                setError(error.message);
            });
    }, [pokedexData]);
    
    if (loading) return <p>Cargando...</p>;
    if (error) return <p>Error: {error}</p>;
    if (!data || !pokedexData) return <p>Cargando datos de la Pokédex...</p>;
    return (
        <>
            {pokedexData && pokedexData.length > 0 && (
                <div>
                    <h3>Pokedex de la región de {location.state}:</h3>
                    <div className='pokemon-grid'>
                        {nameData.length > 0 ? (
                            nameData.map((pokemon, index) => (
                                <Link state={pokemon.id} to="/Dashboard">
                                    <div key={pokemon.id} className='pokemon-card'>
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
                        )}
                    </div>
                </div>
            )}
            <Pie />
        </>
        
    );
}

export default Pokemons;