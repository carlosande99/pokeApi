import { useState, useEffect } from "react";

function usePokedex(evoluciones){
    const [evoData, setEvoData] = useState([]);

    const fetchPokemons = (url) => {
        setEvoData([])
        fetch(url)
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Error en la solicitud");
                }
                return response.json();
            })
            .then((data) => {
                setEvoData(prevData => [...prevData, data]);
            })
            .catch((err) => {
                return(err.message);
            });
    };
    useEffect(() => {
        if (!evoluciones) return;
        // Obtener el Pokémon base
        fetchPokemons(evoluciones.chain.species.url);
        
        // Verificar primera evolución
        const primeraEvo = evoluciones.chain.evolves_to;
        if (primeraEvo && primeraEvo.length === 1) {
            fetchPokemons(primeraEvo[0].species.url);
            
            // Verificar segunda evolución
            const segundaEvo = primeraEvo[0].evolves_to;
            if (segundaEvo && segundaEvo.length > 0) {
                fetchPokemons(segundaEvo[0].species.url);
            }
        }

        // verificar multiples Evoluciones
        if(primeraEvo && primeraEvo.length > 1){
            primeraEvo.map((type, index) => (
                fetchPokemons(type.species.url)
            ));
        }
        
    }, [evoluciones]);
    return {evoData};
}

export default usePokedex;