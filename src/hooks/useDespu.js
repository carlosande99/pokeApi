import { useState, useEffect } from "react";

function useDespu (data) {
    const [desp, setdesp] = useState(null);
    let x;
    useEffect(() => {
        if(!data) return
        if((data.id + 1) === 1026){
            x = 1
        }else{
            x = data.id + 1
        }
        fetch("https://pokeapi.co/api/v2/pokemon-species/"+x)
        .then((response) => {
            if (!response.ok) {
            throw new Error("Error en la solicitud");
            }
            return response.json();
        })
        .then((data) => {
            setdesp(data);
        })
        .catch((err) => {
            return err.message;
        });
    }, [data]);

    return {desp}
}
export default useDespu