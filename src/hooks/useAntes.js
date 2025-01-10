import { useState, useEffect } from "react";

function useAntes (data) {
    const [antes, setantes] = useState(null);
    useEffect(() => {
        if(!data) return
        const x = data.id-1
        fetch("https://pokeapi.co/api/v2/pokemon-species/"+x)
        .then((response) => {
            if (!response.ok) {
            throw new Error("Error en la solicitud");
            }
            return response.json();
        })
        .then((data) => {
            setantes(data);
        })
        .catch((err) => {
            return err.message;
        });
    }, [data]);

    return {antes}
}
export default useAntes