import { useState, useEffect } from "react";

function usePokeSpe (name) {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    //datos principales /pokemon-species
    useEffect(() => {
        fetch("https://pokeapi.co/api/v2/pokemon-species/"+name)
        .then((response) => {
            if (!response.ok) {
            throw new Error("Error en la solicitud");
            }
            return response.json();
        })
        .then((data) => {
            setData(data);
            setLoading(false);
        })
        .catch((err) => {
            setError(err.message);
            setLoading(false);
        });
    }, [name]);

    return {data, error, loading}
}
export default usePokeSpe