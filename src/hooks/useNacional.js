import { useState, useEffect, useRef } from "react";

function useNacional (){
    const [pokemons, setPokemons] = useState([])
    const valor = useRef(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchPokemons = () => {
        setPokemons([]);
        fetch("https://pokeapi.co/api/v2/pokemon?limit=18&offset=" + valor.current)
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Error en la solicitud");
                }
                return response.json();
            })
            .then((data) => {
                setPokemons(prevPokemons => ({
                    ...prevPokemons,
                    results: [...(prevPokemons?.results || []), ...data.results]
                }));
                valor.current = valor.current+18;
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            });
    };

    useEffect(() => {
        fetchPokemons();
    }, []);
    
    return{pokemons, loading, error, fetchPokemons}
}

export default useNacional;