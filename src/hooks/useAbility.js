import { useState, useEffect } from "react";

function useAbility (dataPoke){
    const [habilidades, setAbilidades] = useState([]);
        useEffect(() => {
            if(!dataPoke) return;
            if(dataPoke.length === 0) return
            const promises = dataPoke.abilities.map(entry => {
                const ability = entry.ability.url;
                return fetch(ability)
                    .then(response => {
                        if(!response.ok) {
                            throw new Error(`Error en la solicitud para obtener la nombres`);
                        }
                        return response.json();
                    })
                    .catch(error => {
                        console.error(`Error fetching para los nombres: `, error);
                        return null;
                    });
            });
            Promise.all(promises)
            .then(results => {
                const validResults = results.filter(result => result !== null);
                setAbilidades(validResults);
            })
            .catch(error => {
                console.error("Error en las promesas:", error);
                return error.mesage
            });
        }, [dataPoke])
    return {habilidades}
}
export default useAbility