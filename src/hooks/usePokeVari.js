import { useState, useEffect } from "react";

function usePokeVari (data){
    const [dataPoke, setDataPoke] = useState(null);
        //datos principales /pokemon 
        useEffect(() => {
        if (!data || !data.varieties) return;
            fetch(data.varieties[0].pokemon.url)
                .then((response) => {
                    if (!response.ok) {
                    throw new Error("Error en la solicitud");
                    }
                    return response.json();
                })
                .then((data) => {
                    setDataPoke(data);
                })
                .catch((err) => {
                    return err
                });
        }, [data]);
    return {dataPoke}
}
export default usePokeVari