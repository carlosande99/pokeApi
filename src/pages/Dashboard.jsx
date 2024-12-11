import { useLocation } from 'react-router-dom';
import React, { useState, useEffect } from "react";
import '../App.css';
import { Pie } from './Pie';
import { Link } from "react-router-dom";
function Dashboard() {
    const location = useLocation();
    const [data, setData] = useState(null);
    const [dataPoke, setDataPoke] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [descripcion, setDescripcion] = useState([]);
    const [version, setVersion] = useState([]);
    const [activeDescription, setActiveDescription] = useState(null);
    const [datosVersion, setDatosVersion] = useState(null);
    
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

    useEffect(() => {
        if (!data || !data.flavor_text_entries) return;
        for(let i=0;i<data.flavor_text_entries.length;i++){
            if(data.flavor_text_entries[i].language.name === "es"){
                setDescripcion(nuevoDatos => [...nuevoDatos, data.flavor_text_entries[i].flavor_text])
                setVersion(versiones => [...versiones, data.flavor_text_entries[i].version.url])
            }
        }
    },[data]);

    useEffect(() => {
        if(!version[0] ) return;
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

    if (loading) return <p>Cargando...</p>;
    if (error) return <p>Error: {error}</p>;
    if(!data) return <p>Cargando datos...</p>
    if (!dataPoke) return <p>Cargando datos...</p>;
    if (!version) return <p>Cargando datos...</p>;

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
            <div className="">
                <div className="">
                    <h2>{data.name.charAt(0).toUpperCase() + data.name.slice(1)} N.º {formattedId}</h2>
                    <div>
                        {/* la imagen */}
                        <div>
                            <img 
                            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${data.id}.svg`}
                            alt={data.name}
                            onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${data.id}.png`
                            }}
                            className="pokemon-image"
                            />
                        </div>
                        <div>
                            {/* los botones de las versiones */}
                            <div>
                                <div style={{display: 'flex', justifyContent: 'center', gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))'}}>
                                    {
                                        datosVersion && // Asegúrate de que datosVersion no sea null o undefined
                                        datosVersion.map((item, index) => (
                                            item.names.map((item2, index2) => (
                                                item2.language && item2.language.name === 'es' ? ( // Filtra dentro del segundo map
                                                    <button key={index2} onClick={() => handleButtonClick(index)}>
                                                        <img src="" alt="" />
                                                        {item2.name}
                                                    </button>
                                                ) : null
                                            ))
                                        ))
                                    }
                                </div>
                                {descripcion.map((item, index) => (
                                    // Solo muestra la descripción si el índice coincide con el índice activo
                                    activeDescription === index && <p key={index}>{item}</p>
                                ))}
                            </div>
                            <p><strong>Altura:</strong> {altura}</p>
                            <p><strong>Peso:</strong> {peso}</p>
                            <p><strong>Tipos:</strong> {dataPoke.types.map(type => type.type.name).join(', ')}</p>
                            <p><strong>Debilidades:</strong></p>
                        </div>
                    </div>

                </div>
            </div>
            <Pie />
        </>
        

    )
}

export default Dashboard;