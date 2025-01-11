import { useLocation } from 'react-router-dom';
import { useState } from "react";
import '../css/App.css';
import '../css/lista.css';
import { Pie } from './Pie';
import BarChart from '../components/BarChart.jsx'
import TypesSpanish from '../components/types.jsx'
import { useBackground } from '../hooks/useBackground';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
// hooks
import usePokeSpe from '../hooks/usePokeSpe.js';
import usePokeVari from '../hooks/usePokeVari.js';
import useDescrip from '../hooks/useDescrip.js';
import useButDes from '../hooks/useButDes.js';
import useAbility from '../hooks/useAbility.js';
import useTipo from '../hooks/useTipo.js';
import useAntes from '../hooks/useAntes.js';
import useDespu from '../hooks/useDespu.js';

function Dashboard() {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const searchQuery = queryParams.get('search');
    const [activeDescription, setActiveDescription] = useState(0);
    const {data, error, loading} = usePokeSpe(location.state, searchQuery)
    const {dataPoke} = usePokeVari(data)
    const {descripcion, version} = useDescrip(data)
    const {datosVersion} = useButDes(version)
    const {habilidades} = useAbility(dataPoke)
    const {tipos} = useTipo(dataPoke)
    const {antes} = useAntes(data)
    const {desp} = useDespu(data)

    useBackground()
    
    if (loading) return <p className='colorLetras'>Cargando...</p>;
    if (error) return <p className='colorLetras'>Error: {error}</p>;
    if(!data) return <p className='colorLetras'>Cargando datos...</p>
    if (!dataPoke) return <p className='colorLetras'>Cargando datos...</p>;
    if (!version) return <p className='colorLetras'>Cargando datos...</p>;
    if (!habilidades) return <p className='colorLetras'>Cargando datos...</p>;
    if(!datosVersion) return <p className='colorLetras'>Cargando datos...</p>
    // if(!antes && !desp) return <p className='colorLetras'>Cargando datos...</p>

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
    let buscar = null
    let buscar2 = null
    if(desp){
        buscar = desp.id;
    }
    if(antes){
        buscar2 = antes.id
    }
    
    return (
        <>
            <div className="datos1" key={'1'}>
                <div className='d-flex justify-content-between w-100'>
                    <a href={`/Dashboard?search=${buscar2}`} className='w-25 d-flex align-items-center justify-content-center bg-secondary btn sigAtr'>
                        <span className='me-2 float-start'>
                            <FontAwesomeIcon icon={faArrowRight} rotation={180} style={{color: "#000000",}} />                     
                        </span>
                        <span className='me-2'>
                            N.º{data.id-1}
                        </span>
                        <span className='me-2'>
                            {
                                antes ? (
                                    antes.name.charAt(0).toUpperCase() + antes.name.slice(1)
                                ): null
                                
                            }
                        </span>
                    </a>
                    <div className=''>
                        {/* titulo */}
                        <h2 key={'h2'} className='colorLetras'>{data.name.charAt(0).toUpperCase() + data.name.slice(1)} N.º {formattedId}</h2>
                        <select className='form-select w-100 mb-2'>
                            {
                                data.varieties.map((item, index) => (
                                    <option value={index}>{item.pokemon.name.charAt(0).toUpperCase() + item.pokemon.name.slice(1)}</option>
                                ))
                            }
                        </select>
                    </div>
                    <a href={`/Dashboard?search=${buscar}`} className='w-25 d-flex align-items-center justify-content-center bg-secondary btn sigAtr'>                          
                        <div className='w-100'>
                            <span>
                                {
                                    desp ? (
                                        desp.name.charAt(0).toUpperCase() + desp.name.slice(1)
                                    ) : null
                                }            
                            </span>
                            <span>
                                N.º{data.id+1}
                            </span>
                            <span>
                                <FontAwesomeIcon icon={faArrowRight} style={{color: "#000000"}} />  
                            </span>
                        </div>
                    </a>
                </div>
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
                                <div className='d-flex' key={'7'}>
                                    <h4 key={'h4'}>Versiones: </h4>
                                    {
                                        datosVersion &&
                                        datosVersion.map((item, index) => (
                                            item.names.map((item2, index2) => (
                                                item2.language && item2.language.name === 'es' ? (
                                                    <div className='divPokeBola'>
                                                        <button key={`button-${index}-${index2}`} onClick={() => handleButtonClick(index)} className='botonPokeBola' 
                                                        data-bs-toggle="tooltip" data-bs-placement="bottom" data-bs-title="Tooltip on bottom" type='button'>
                                                            <img src={require(`../assets/images/pokeball-pokemon-svgrepo-com.png`)} alt={`img-${index}-${index2}`} key={`img-${index}-${index2}`} className='pokebolas'>
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
                                                                <button key={`ability-${index}-${index2}`} className='btn btn-primary pokemon-atributos'>{type2.name} </button>
                                                            ) : null
                                                        ))
                                                    ))
                                                ): null
                                            }
                                    </div>
                                    {/* <div className='datosAbility'>
                                        hola
                                    </div> */}
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* vent, des y punts */}
                    <div className='divPrin' >
                        {/* puntos base */}
                        <div id='puntosBase' className='rounded'>
                            <h4>Puntos Base</h4>
                            <BarChart stats={stats}/>
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