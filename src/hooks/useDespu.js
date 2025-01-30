import { useState, useEffect, useRef } from "react";

function useDespu (data) {
    const [desp, setdesp] = useState(null);
    const x = useRef(0);
    // let x;
    useEffect(() => {
        if(!data) return
        if((data.id + 1) === 1026){
            x.current = 1
        }else{
            x.current = data.id + 1
        }
        fetch("https://pokeapi.co/api/v2/pokemon-species/"+x.current)
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