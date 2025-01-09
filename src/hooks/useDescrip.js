import { useState, useEffect } from "react";

function useDescrip (data){
    const [descripcion, setDescripcion] = useState([]);
    const [version, setVersion] = useState([]);
        //datos principales /pokemon 
        useEffect(() => {
            if (!data || !data.flavor_text_entries) return;
            let foundSpanish = false;
            for(let i=0;i<data.flavor_text_entries.length;i++){
                if(data.flavor_text_entries[i].language.name === "es"){
                    setDescripcion(nuevoDatos => [...nuevoDatos, data.flavor_text_entries[i].flavor_text])
                    setVersion(versiones => [...versiones, data.flavor_text_entries[i].version.url])
                    foundSpanish = true;
                }
            }
            // Si no se encontró español, buscamos inglés
            if (!foundSpanish) {
                for (let i = 0; i < data.flavor_text_entries.length; i++) {
                    const entry = data.flavor_text_entries[i];
    
                    if (entry.language.name === "en") {
                        setDescripcion(nuevoDatos => [...nuevoDatos, entry.flavor_text]);
                        setVersion(versiones => [...versiones, entry.version.url]);
                        break;
                    }
                }
            }
        },[data]);
    return {descripcion, version}
}
export default useDescrip