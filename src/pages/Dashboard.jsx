import { useLocation } from 'react-router-dom';
import React, { useState, useEffect } from "react";
import '../css/App.css';
import '../css/lista.css';
import { Pie } from './Pie';
import LinesChart from '../components/LinesChart.js'
import TypesSpanish from '../components/types.js'
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
    const [ventYdes, setventYdes] = useState({});

    useEffect(() => {
        document.documentElement.style.setProperty('--fondo-url', `url(/container_bg.png)`);
    })
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
            // console.log(validResults)
        })
        .catch(error => {
            console.error("Error en las promesas:", error);
            setError(error.message);
        });
    }, [dataPoke])
    
    // if necesarios para los useEffect
    if (loading) return <p className='colorLetras'>Cargando...</p>;
    if (error) return <p className='colorLetras'>Error: {error}</p>;
    if(!data) return <p className='colorLetras'>Cargando datos...</p>
    if (!dataPoke) return <p className='colorLetras'>Cargando datos...</p>;
    if (!version) return <p className='colorLetras'>Cargando datos...</p>;
    if (!habilidades) return <p className='colorLetras'>Cargando datos...</p>;
    if(!datosVersion) return <p className='colorLetras'>Cargando datos...</p>
    if(!ventYdes) return <p className='colorLetras'>Cargando datos...</p>

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
    const stats = dataPoke.stats.map(stat => stat.base_stat);
    return (
        <>
            <div className="datos1" key={'1'}>
                {/* titulo */}
                <h2 key={'h2'} className='colorLetras'>{data.name.charAt(0).toUpperCase() + data.name.slice(1)} N.º {formattedId}</h2>
                {/* datos del pokemon */}
                <div className="datos" key={'2'}>
                    {/* div imagen, versiones y datos principales */}
                    <div key={'3'} className='divPrin'>
                        {/* la imagen */}
                        <div key={'4'} id='divImage' className='rounded'>
                            <img 
                            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${data.id}.svg`}
                            alt={data.name}
                            onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${data.id}.png`
                            }}
                            className="pokemon-image"
                            key={'img'}
                            />
                        </div>
                        {/* datos */}
                        <div key={'5'} id='divDatos'>
                            {/* datos de las descripciones */}
                            <div key={'6'} id='versiones'>
                                {descripcion.map((item, index) => (
                                    // Solo muestra la descripción si el índice coincide con el índice activo
                                    activeDescription === index && <p key={`desc-${index}`}>{item}</p>
                                ))}
                                <div style={{display: 'flex'}} key={'7'}>
                                    <h4 key={'h4'}>Versiones: </h4>
                                    {
                                        datosVersion &&
                                        datosVersion.map((item, index) => (
                                            item.names.map((item2, index2) => (
                                                item2.language && item2.language.name === 'es' ? (
                                                    <div className='divPokeBola'>
                                                        <button key={`button-${index}-${index2}`} onClick={() => handleButtonClick(index)} className='botonPokeBola'>
                                                            <img src={`pokeball-pokemon-svgrepo-com.svg`} alt={`img-${index}-${index2}`} key={`img-${index}-${index2}`} className='pokebolas'>
                                                            </img>
                                                        </button>
                                                    </div>
                                                ) : null
                                            ))
                                        ))
                                    }
                                </div>
                            </div>
                            {/* datos principales */}
                            <div id='datosPoke' className='rounded'>
                                <div id='datosPokeMenor'>
                                    <div className='datosPokeMenor2'>
                                        <p key={'p1'}><strong key={'strong1'}>Altura:</strong></p><span>{altura}</span>
                                    </div>
                                    <div className='datosPokeMenor2'>
                                        <p key={'p2'}><strong key={'strong2'}>Peso:</strong></p><span>{peso}</span>
                                    </div>
                                    <div className='datosPokeMenor2'>
                                        <p key={'p4'}>
                                            <strong key={'strong3'}>Tipos: </strong>
                                        </p>
                                            {
                                                tipos.map((type2, index2) => (
                                                    type2.names && type2.names.length > 0 ? (
                                                        type2.names.map((type, index) => (
                                                            type.language && type.language.name === 'es' ? (
                                                                <span key={`type-${index2}-${index}`} className={`background-color-`+type.name+` `+`pokemon-atributos btn`}>{type.name} </span>
                                                            ): null
                                                        ))
                                                    ): null
                                                ))
                                            }
                                    </div>
                                    <div className='datosPokeMenor2'>
                                        <p key={'p5'}>
                                            <strong key={'strong4'}>Habilidades: </strong>
                                        </p>
                                            {
                                                habilidades && habilidades.length > 0 ? (
                                                    habilidades.map((type, index) => (
                                                        type.names.map((type2, index2) => (
                                                            type2.language && type2.language.name === 'es' ? (
                                                                <button key={`ability-${index}-${index2}`} className='btn btn-primary'>{type2.name} </button>
                                                            ) : null
                                                        ))
                                                    ))
                                                ): null
                                            }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* vent, des y punts */}
                    <div className='divPrin' >
                        {/* puntos base */}
                        <div id='puntosBase' className='rounded'>
                            <h4>Puntos Base</h4>
                            <LinesChart stats={stats}/>
                        </div>
                        {/* ventajas y desventajas */}
                        <div id='venDesv'>
                            <TypesSpanish typesNames={tipos}/>
                        </div>
                    </div>
                </div>
            </div>
            <Pie key={'pie'} />
        </>
        
 
    )
}

export default Dashboard;