import { useState, useEffect } from "react";

function useButDes (version){
    const [datosVersion, setDatosVersion] = useState(null);
        //datos principales /pokemon 
        useEffect(() => {
            if(!version && !version[0]) return;
            const promises = version.map(entry => {
                const nombres = entry;
                return fetch(nombres)
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
                    setDatosVersion(validResults);
                })
                .catch(error => {
                    console.error("Error en las promesas:", error);
                    return error.mesage
                });
        }, [version]);
    return {datosVersion}
}
export default useButDes