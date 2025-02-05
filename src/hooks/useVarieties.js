import { useState, useEffect } from "react";

function useVarieties (data) {
    const [pokemons, setPokemon] = useState([])
    useEffect(() => {
        if(!data || !data.length > 0) return
        setPokemon([])
        if(Array.isArray(data)){
            // data.map((type, index) => (
                fetchVariedad2(data)
            // ))
        }else{
            fetchVariedad(data)
        }
    }, [data]);

    const fetchVariedad = (data) => {
        fetch("https://pokeapi.co/api/v2/pokemon/"+data)
        .then((response) => {
            if (!response.ok) {
            throw new Error("Error en la solicitud");
            }
            return response.json();
        })
        .then((data) => {
            setPokemon(data)
            // console.log(data)
        })
        .catch((err) => {
            return err.message;
        });
    }
    const fetchVariedad2 = (data) => {
        const promises = data.map(entry => {
            const id = entry.id;
            return fetch("https://pokeapi.co/api/v2/pokemon/"+id)
            .then((response) => {
                if (!response.ok) {
                throw new Error("Error en la solicitud");
                }
                return response.json();
            })
            .catch((error) => {
                console.error(`Error fetching para la pokedex: `, error);
                return null;
            });
        });
        Promise.all(promises)
        .then(results => {
            const validResults = results.filter(result => result !== null);
            setPokemon(prevPokemons => [...prevPokemons, validResults]);
        })
        .catch(error => {
            console.error("Error en las promesas:", error);
            return error;
        });
    }
    return {pokemons}
}
export default useVarieties