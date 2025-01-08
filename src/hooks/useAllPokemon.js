import { useState, useEffect } from "react";

function useAllPokemon (pokedexData){
    const [offset, setOffset] = useState(0);
    const [cantidadPoke, setCantidadPoke] = useState(0);
    const [nameData, setNameData] = useState([]);
    const [visibleCount] = useState(18);

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
                return null;
            });
    }, [pokedexData, offset]);
    return {cantidadPoke, offset, setOffset, nameData, visibleCount};
}

export default useAllPokemon;