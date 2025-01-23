import { useState, useEffect } from "react";

function useVarieties (data) {
    const [pokemons, setPokemon] = useState([])
    useEffect(() => {
        if(!data) return
        setPokemon([])
        if(Array.isArray(data)){
            data.map((type, index) => (
                fetchVariedad2(type.id)
            ))
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
        fetch("https://pokeapi.co/api/v2/pokemon/"+data)
        .then((response) => {
            if (!response.ok) {
            throw new Error("Error en la solicitud");
            }
            return response.json();
        })
        .then((data) => {
            setPokemon(prevPokemons => [...prevPokemons, data]);
            // console.log(data)
        })
        .catch((err) => {
            return err.message;
        });
    }
    return {pokemons}
}
export default useVarieties