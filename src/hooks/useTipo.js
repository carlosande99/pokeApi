import { useState, useEffect } from "react";

function useTipo (dataPoke){
    const [tipos, setTipos] = useState([]);
        useEffect(() => {
            if(!dataPoke) return;
            if(dataPoke.length === 0) return
            setTipos([])
            if(Array.isArray(dataPoke)){
                dataPoke.map((type, index) => (
                    fecthTipos2(type)
                ))
            }else{
                fecthTipos(dataPoke)
            }
            
        }, [dataPoke])

    const fecthTipos = (dataPoke) => {
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
            setTipos(validResults)
        })
        .catch(error => {
            console.error("Error en las promesas:", error);
            return error.mesage
        });
    }
    const fecthTipos2 = (dataPoke) => {
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
            setTipos(prevPokemons => [...prevPokemons, validResults]);
        })
        .catch(error => {
            console.error("Error en las promesas:", error);
            return error.mesage
        });
    }
    return {tipos}
}
export default useTipo