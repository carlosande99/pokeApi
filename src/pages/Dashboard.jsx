import { useLocation } from 'react-router-dom';
import React, { useState, useEffect } from "react";
import '../App.css';
import { Pie } from './Pie';
function Dashboard() {
    const location = useLocation();
    const [data, setData] = useState(null);
    const [dataPoke, setDataPoke] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [descripcion, setDescripcion] = useState([]);
    const [version, setVersion] = useState([]);
    const [activeDescription, setActiveDescription] = useState(0);
    const [datosVersion, setDatosVersion] = useState(null);
    const [habilidades, setAbilidades] = useState([]);
    const [tipos, setTipos] = useState([]);
    //datos principales /pokemon-species
    useEffect(() => {
        fetch("https://pokeapi.co/api/v2/pokemon-species/"+location.state)
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
    }, [location.state]);
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
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            });
    }, [data]);
    // descipciones
    useEffect(() => {
        if (!data || !data.flavor_text_entries) return;
        let foundSpanish = false;
        for(let i=0;i<data.flavor_text_entries.length;i++){
            if(data.flavor_text_entries[i].language.name === "es"){
                setDescripcion(nuevoDatos => [...nuevoDatos, data.flavor_text_entries[i].flavor_text])
                setVersion(versiones => [...versiones, data.flavor_text_entries[i].version.url])
                foundSpanish = true;
            }
        }
        // Si no se encontró español, buscamos inglés
        if (!foundSpanish) {
            for (let i = 0; i < data.flavor_text_entries.length; i++) {
                const entry = data.flavor_text_entries[i];

                if (entry.language.name === "en") {
                    setDescripcion(nuevoDatos => [...nuevoDatos, entry.flavor_text]);
                    setVersion(versiones => [...versiones, entry.version.url]);
                    break;
                }
            }
        }
    },[data]);
    // botones de la descripcion
    useEffect(() => {
        if(!version && !version[0]) return;
        const promises = version.map(entry => {
            const nombres = entry;
            return fetch(nombres)
                .then(response => {
                    if(!response.ok) {
                        throw new Error(`Error en la solicitud para obtener la nombres`);
                    }
                    return response.json();
                })
                .catch(error => {
                    console.error(`Error fetching para los nombres: `, error);
                    return null;
                });
        });
        Promise.all(promises)
            .then(results => {
                const validResults = results.filter(result => result !== null);
                setDatosVersion(validResults);
            })
            .catch(error => {
                console.error("Error en las promesas:", error);
                setError(error.message);
            });
    }, [version]);
    // habilidades que tiene de manera pasiva
    useEffect(() => {
        if(!dataPoke) return;
        const promises = dataPoke.abilities.map(entry => {
            const ability = entry.ability.url;
            return fetch(ability)
                .then(response => {
                    if(!response.ok) {
                        throw new Error(`Error en la solicitud para obtener la nombres`);
                    }
                    return response.json();
                })
                .catch(error => {
                    console.error(`Error fetching para los nombres: `, error);
                    return null;
                });
        });
        Promise.all(promises)
        .then(results => {
            const validResults = results.filter(result => result !== null);
            setAbilidades(validResults);
        })
        .catch(error => {
            console.error("Error en las promesas:", error);
            setError(error.message);
        });
    }, [dataPoke])
    // tipos, ventajas y desventajas
    useEffect(() => {
        if(!dataPoke) return;
        const promises = dataPoke.types.map(entry => {
            const ability = entry.type.url;
            return fetch(ability)
                .then(response => {
                    if(!response.ok) {
                        throw new Error(`Error en la solicitud para obtener la nombres`);
                    }
                    return response.json();
                })
                .catch(error => {
                    console.error(`Error fetching para los nombres: `, error);
                    return null;
                });
        });
        Promise.all(promises)
        .then(results => {
            const validResults = results.filter(result => result !== null);
            setTipos(validResults);
        })
        .catch(error => {
            console.error("Error en las promesas:", error);
            setError(error.message);
        });
    }, [dataPoke])


    // if necesarios para los useEffect
    if (loading) return <p>Cargando...</p>;
    if (error) return <p>Error: {error}</p>;
    if(!data) return <p>Cargando datos...</p>
    if (!dataPoke) return <p>Cargando datos...</p>;
    if (!version) return <p>Cargando datos...</p>;
    if (!habilidades) return <p>Cargando datos...</p>;
    if(!datosVersion) return <p>Cargando datos...</p>

    const formattedId = String(data.id).padStart(4, '0');
    function formatearAltura(altura) {
        const heightInMeters = (altura / 10).toFixed(1);
        const formattedHeight = `${heightInMeters} m`;
        return formattedHeight;
    }
    function formatearPeso(peso){
        const heightInMeters = (peso / 10).toFixed(1);
        const formattedHeight = `${heightInMeters} kg`;
        return formattedHeight;
    }
    const altura = formatearAltura(dataPoke.height)
    const peso = formatearPeso(dataPoke.weight)
    const handleButtonClick = (index) => {
        if (activeDescription === index) {
            setActiveDescription(null);
        } else {
            setActiveDescription(index);
        }
    };
    return (
        <>
            <div className="" key={'1'}>
                <div className="" key={'2'}>
                    <h2 key={'h2'}>{data.name.charAt(0).toUpperCase() + data.name.slice(1)} N.º {formattedId}</h2>
                    <div key={'3'} id='divPrin'>
                        {/* la imagen */}
                        <div key={'4'} id='divImage' >
                            <img 
                            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${data.id}.svg`}
                            alt={data.name}
                            onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${data.id}.png`
                            }}
                            className="pokemon-image"
                            key={'img'}
                            />
                        </div>
                        <div key={'5'} id='divDatos'>
                            <h4 key={'h4'}>Los botones de las versiones</h4>
                            <div key={'6'}>
                                <div style={{display: 'flex', justifyContent: 'center', gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))'}} key={'7'}>
                                    {
                                        datosVersion &&
                                        datosVersion.map((item, index) => (
                                            item.names.map((item2, index2) => (
                                                item2.language && item2.language.name === 'es' ? (
                                                    <button key={`button-${index}-${index2}`} onClick={() => handleButtonClick(index)}>
                                                        <img src={`aplicacion_web/public/pokeball-pokemon-svgrepo-com.png`} alt="" key={`img-${index}-${index2}`}/>
                                                        {item2.name} 
                                                    </button> 
                                                ) : null
                                            ))
                                        ))
                                    }
                                </div>
                                {descripcion.map((item, index) => (
                                    // Solo muestra la descripción si el índice coincide con el índice activo
                                    activeDescription === index && <p key={`desc-${index}`}>{item}</p>
                                ))}
                            </div>
                            <div id='datosPoke' style={{backgroundColor: 'blue'}}>
                                <p key={'p1'}><strong key={'strong1'}>Altura:</strong> {altura}</p>
                                <p key={'p2'}><strong key={'strong2'}>Peso:</strong> {peso}</p>
                                <p key={'p4'}>
                                    <strong key={'strong3'}>Tipos: </strong> 
                                    {
                                        tipos.map((type2, index2) => (
                                            type2.names && type2.names.length > 0 ? (
                                                type2.names.map((type, index) => (
                                                    type.language && type.language.name === 'es' ? (
                                                        <span key={`type-${index2}-${index}`}>{type.name} </span>
                                                    ): null
                                                ))
                                            ): null
                                        ))
                                    }
                                </p>
                                <p key={'p5'}>
                                    <strong key={'strong4'}>Habilidades: </strong>
                                    {
                                        habilidades && habilidades.length > 0 ? (
                                            habilidades.map((type, index) => (
                                                type.names.map((type2, index2) => (
                                                    type2.language && type2.language.name === 'es' ? (
                                                        <button key={`ability-${index}-${index2}`}>{type2.name} </button>
                                                    ) : null
                                                ))
                                            ))
                                        ): null
                                    }
                                </p>
                            </div>
                            <div id='puntosBase' style={{backgroundColor: 'red'}}>
                                <p key={'p3'}>
                                    Puntos Base: 
                                    <span key={'span1'}> Ps: 
                                        {
                                            dataPoke.stats[0].base_stat
                                        }
                                    </span>
                                    <span key={'span2'}> Ataque: 
                                        {
                                            dataPoke.stats[1].base_stat
                                        }
                                    </span>
                                    <span key={'span3'}> Defensa: 
                                        {
                                            dataPoke.stats[2].base_stat
                                        }
                                    </span>
                                    <span key={'span4'}> Ataque Especial: 
                                        {
                                            dataPoke.stats[3].base_stat
                                        }
                                    </span>
                                    <span key={'span5'}> Defensa Especial: 
                                        {
                                            dataPoke.stats[4].base_stat
                                        }
                                    </span>
                                    <span key={'span6'}> Velocidad: 
                                        {
                                            dataPoke.stats[5].base_stat
                                        }
                                    </span>
                                </p>
                            </div>
                            <div id='venDesv' style={{backgroundColor: 'black'}}>
                                <div id='ventaja' style={{backgroundColor: 'red'}}>
                                    <p key={'p6'}>
                                        <strong key={'strong5'}>Ventaja:</strong>
                                        {
                                            tipos.map((type, index) => (
                                                type.damage_relations.double_damage_to.map((type2, index2) => (
                                                    <span key={`advantage-${index}-${index2}`}>{type2.name} </span>
                                                ))
                                            ))
                                        }
                                    </p>
                                </div>
                                <div id='desventaja' style={{backgroundColor: 'blue'}}>
                                    <p key={'p7'}><strong key={'strong6'}>Desventaja:</strong>
                                        {
                                            tipos.map((type, index) => (
                                                type.damage_relations.double_damage_from.map((type2, index2) => (
                                                    <span key={`disadvantage-${index}-${index2}`}>{type2.name} </span>
                                                ))
                                            ))
                                        }
                                    </p>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Pie key={'pie'} />
        </>
        

    )
}

export default Dashboard;