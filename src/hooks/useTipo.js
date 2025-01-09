import { useState, useEffect } from "react";

function useTipo (dataPoke){
    const [tipos, setTipos] = useState([]);
        useEffect(() => {
            if(!dataPoke) return;
            const promises = dataPoke.types.map(entry => {
                const ability = entry.type.url;
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
                setTipos(validResults);
            })
            .catch(error => {
                console.error("Error en las promesas:", error);
                return error.mesage
            });
        }, [dataPoke])
    return {tipos}
}
export default useTipo