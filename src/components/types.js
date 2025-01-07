import { useState, useEffect } from "react";
import filtrarVentajasYdesventajas from "./QuitarDupli"

export default function TypesSpanish({typesNames}) {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [typesSpanish, setTypesSpanish] = useState({});
    const [ventajasYdesventajas, setVentajasYdesventajas] = useState({});
    useEffect(() => {
        // Función para obtener los tipos
        const fetchTypes = async () => {
            try {
                const response = await fetch("https://pokeapi.co/api/v2/type/");
                if (!response.ok) {
                    throw new Error("Error en la solicitud");
                }
                const data = await response.json();

                // Obtener los nombres de los tipos
                const promises = data.results.map(entry => {
                    return fetch(entry.url)
                        .then(response => {
                            if (!response.ok) {
                                throw new Error(`Error en la solicitud para obtener los nombres`);
                            }
                            return response.json();
                        });
                });

                const results = await Promise.all(promises);
                // mapa
                const map = results.reduce((acc, type) => {
                    const englishName = type.name;
                    const spanishName =
                        type.names.find((n) => n.language.name === "es")?.name ||
                        englishName;
                    acc[englishName] = spanishName;
                    return acc;
                }, {});

                setTypesSpanish(map);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchTypes();
    }, []); 
    useEffect(() => {
        if (!typesNames || typesNames.length === 0) return;
        const prueba = filtrarVentajasYdesventajas(typesNames);
        setVentajasYdesventajas(prueba);
    }, [typesNames]);
    if (loading) return <p className='colorLetras'>Cargando...</p>;
    if (error) return <p className='colorLetras'>Error: {error}</p>;
    if (!typesNames || typesNames.length === 0) return <p className='colorLetras'>No hay tipos disponibles.</p>;
    if (!ventajasYdesventajas || ventajasYdesventajas.length === 0) return <p className='colorLetras'>No hay tipos disponibles.</p>;
    return (
        <>    
            <div id='ventaja'>
                <p key={'p6'}>
                    <strong key={'strong5'}>double_to:</strong></p>
                    {
                        ventajasYdesventajas.double_damage_to.map((type2, index2) => (
                            <span className={`background-color-`+typesSpanish[type2]+` `+`pokemon-atributos btn`}>{typesSpanish[type2] || "Desconocido"} </span>
                        ))
                    }
                <p>half_to:</p>
                {
                    ventajasYdesventajas.half_damage_to.map((type2, index2) => (
                        <span className={`background-color-`+typesSpanish[type2]+` `+`pokemon-atributos btn`}>{typesSpanish[type2] || "Desconocido"} </span>
                    ))
                }
                
            </div>
            <div id='desventaja'>
                <p key={'p7'}><strong key={'strong6'}>double_from:</strong></p>
                    {
                        ventajasYdesventajas.double_damage_from.map((type2, index2) => (
                            <span className={`background-color-`+typesSpanish[type2]+` `+`pokemon-atributos btn`}>{typesSpanish[type2] || "Desconocido"} </span>
                        ))
                    }
                <p>half_from: </p>
                {
                    ventajasYdesventajas.half_damage_from.map((type2, index2) => (
                        <span className={`background-color-`+typesSpanish[type2]+` `+`pokemon-atributos btn`}>{typesSpanish[type2] || "Desconocido"} </span>
                    ))
                }
            </div>
            <div id='inmune'>
                <p><strong>no_from:</strong></p>
                    {
                        ventajasYdesventajas.no_damage_from.map((type2, index2) => (
                            <span className={`background-color-`+typesSpanish[type2]+` `+`pokemon-atributos btn`}>{typesSpanish[type2] || "Desconocido"} </span>
                        ))
                    }
                <p>no_to</p> 
                {
                    ventajasYdesventajas.no_damage_to.map((type2, index2) => (
                        <span className={`background-color-`+typesSpanish[type2]+` `+`pokemon-atributos btn`}>{typesSpanish[type2] || "Desconocido"} </span>
                    ))
                }          
            </div>
        </>
    );
}