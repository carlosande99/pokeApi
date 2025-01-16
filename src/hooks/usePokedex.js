import { useState, useEffect } from "react";

function usePokedex(data){
    const [pokedexData, setPokedexData] = useState(null);
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
                return error;
            });
    }, [data]);

    return {pokedexData};
}

export default usePokedex;