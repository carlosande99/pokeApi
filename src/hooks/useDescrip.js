import { useState, useEffect } from "react";

function useDescrip (data){
    const [descripcion, setDescripcion] = useState([]);
    const [version, setVersion] = useState([]);
        //datos principales /pokemon 
        useEffect(() => {
            setDescripcion([]);
            setVersion([]);
            if (!data || !data.flavor_text_entries) return;
            let foundSpanish = false;
            let count = 0
            for(let i=0;i<data.flavor_text_entries.length;i++){
                if(data.flavor_text_entries[i].language.name === "es"){
                    setDescripcion(nuevoDatos => [...nuevoDatos, data.flavor_text_entries[i].flavor_text])
                    setVersion(versiones => [...versiones, data.flavor_text_entries[i].version.url])
                    foundSpanish = true;
                    count++
                    if(count == 2 ){
                        break
                    }
                }
            }
            // Si no se encontró español, buscamos inglés
            if (!foundSpanish) {
                for (let i = 0; i < data.flavor_text_entries.length; i++) {
                    const entry = data.flavor_text_entries[i];
    
                    if (entry.language.name === "en") {
                        setDescripcion(nuevoDatos => [...nuevoDatos, entry.flavor_text]);
                        setVersion(versiones => [...versiones, entry.version.url]);
                        count++
                        if(count == 2 ){
                            break
                        }
                    }
                }
            }
        },[data]);
    return {descripcion, version}
}
export default useDescrip