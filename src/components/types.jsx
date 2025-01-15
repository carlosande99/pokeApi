import { useState, useEffect } from "react";
import filtrarVentajasYdesventajas from "../utils/QuitarDupli"
import { eliminarDuplicados } from "../utils/EliminarDuplicados";
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

    const array1 = ventajasYdesventajas.double_damage_from;
    const array2 = ventajasYdesventajas.half_damage_from;
    const [resultado1, resultado2] = eliminarDuplicados(array1, array2);
    return (
        <>    
            <div id="ventaja">
                <p key={'p8'}><strong key={'strong6'}>Ventaja:</strong></p>
                    {
                        resultado2.map((type2, index2) => (
                            <span className={`background-color-`+typesSpanish[type2]+` `+`pokemon-atributos btn mb-1`}>{typesSpanish[type2] || "Desconocido"} </span>
                        ))
                    }
            </div>
            <div id='desventaja'>
                <p key={'p7'}><strong key={'strong6'}>Desventaja:</strong></p>
                {
                    resultado1.map((type2, index2) => (
                        <span className={`background-color-`+typesSpanish[type2]+` `+`pokemon-atributos btn mb-1`}>{typesSpanish[type2] || "Desconocido"} </span>
                    ))
                }
            </div>
        </>
    );
}