import { useState, useEffect } from "react";

function useVarieties (data) {
    const [pokemons, setPokemon] = useState([])
    useEffect(() => {
        if(!data) return
        fetch("https://pokeapi.co/api/v2/pokemon/"+data)
        .then((response) => {
            if (!response.ok) {
            throw new Error("Error en la solicitud");
            }
            return response.json();
        })
        .then((data) => {
            setPokemon(data);
            // console.log(data)
        })
        .catch((err) => {
            return err.message;
        });
    }, [data]);
    return {pokemons}
}
export default useVarieties