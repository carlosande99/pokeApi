import { useEffect, useState } from "react";
function useEvo(data){
    const [evolucion, setEvolucion] = useState();
    useEffect(() => {
        if(!data && data.evolution_chain.url) return;
        fetch(data.evolution_chain.url)
        .then((response) => {
            if (!response.ok) {
                throw new Error("Error en la solicitud");
            }
            return response.json();
        })
        .then((data) => {
            setEvolucion(data);
        })
        .catch((err) => {
            return err.message;
        });
    }, [data]);

    return [evolucion]
}
export default useEvo;