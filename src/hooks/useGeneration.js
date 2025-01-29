import { useEffect, useState } from "react";

function useGeneration (data){
    const [generation, setGeneration] = useState([])
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        if(!data) return
        setGeneration([])
        fetch("https://pokeapi.co/api/v2/generation/"+data)
        .then((response) => {
            if (!response.ok) {
                throw new Error("Error en la solicitud");
            }
            return response.json();
        })
        .then((data) => {
            setGeneration(data);
            setLoading(false);
        })
        .catch((err) => {
            setError(err.message);
            setLoading(false);
        });
    }, [data])
    
    return {generation, loading, error};
}
export default useGeneration;