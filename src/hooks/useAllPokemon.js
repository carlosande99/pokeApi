import { useState, useEffect, useRef } from "react";

function useAllPokemon (pokedexData, gene){
    const [offset, setOffset] = useState(0);
    const [cantidadPoke, setCantidadPoke] = useState(0);
    const [nameData, setNameData] = useState([]);
    const [visibleCount] = useState(18);
    const generation = useRef(0);

    useEffect(() => {
        if (generation.current !== gene) {
            generation.current = gene;
            setOffset(0);
            setNameData([]);
            setCantidadPoke(0);
        }
    }, [gene]);

    useEffect(() => {
        if (!pokedexData) return;
        let x = null;
        let uniqueEntries;

        if(pokedexData[0] && pokedexData[0].pokemon_entries){
            const allPokemonEntries = pokedexData.flatMap(pokedex => 
                pokedex.pokemon_entries || []
            );
            
            uniqueEntries = Array.from(new Set(
                allPokemonEntries.map(entry => entry.pokemon_species.name)
            )).map(name => 
                allPokemonEntries.find(entry => entry.pokemon_species.name === name)
            );
            setCantidadPoke(uniqueEntries.length)
        }else if(!pokedexData.pokemon_species){
            setCantidadPoke(pokedexData.length)
            uniqueEntries = pokedexData;
            x = true
        }else{
            setCantidadPoke(pokedexData.length)
            uniqueEntries = pokedexData.pokemon_species;
            x = true
        }
        // Cargar solo los Pokémon visibles
        const promises = uniqueEntries.slice(offset, offset + visibleCount).map(entry => {
            let pokemonName, pokemonEspecie;
            if(x === null){
                pokemonName = entry.pokemon_species.name;
                pokemonEspecie = entry.pokemon_species.url;
            }else if(entry.species){
                pokemonName = entry.species.name;
                pokemonEspecie = entry.species.url;
            }else{
                pokemonName = entry.name;
                pokemonEspecie = entry.url;
            }


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