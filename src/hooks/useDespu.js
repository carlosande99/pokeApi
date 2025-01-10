import { useState, useEffect } from "react";

function useDespu (data) {
    const [desp, setdesp] = useState(null);
    useEffect(() => {
        if(!data) return
        const x = data.id+1
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