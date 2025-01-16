import { useLocation, useParams } from 'react-router-dom';
import { useState } from "react";
import { Link } from "react-router-dom";
import '../css/App.css';
import '../css/lista.css';
import { Pie } from './Pie';
import { useBackground } from '../hooks/useBackground';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import DatosPoke from '../components/DatosPoke.jsx';
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
    const {pokemon} = useParams();
    const location = useLocation();
    const [activeDescription, setActiveDescription] = useState(0);
    const {data, error, loading} = usePokeSpe(location.state, pokemon)
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

    const formattedId = String(data.id).padStart(4, '0');
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
                    <Link to={`/Dashboard/${antes.name}`} state={buscar2} className='w-25 d-flex align-items-center justify-content-center bg-secondary btn sigAtr'>
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
                    </Link>
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
                    <Link to={`/Dashboard/${desp.name}`} state={buscar} className='w-25 d-flex align-items-center justify-content-center bg-secondary btn sigAtr'>                          
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
                    </Link>
                </div>
                <DatosPoke 
                    data={data} 
                    descripcion={descripcion} 
                    activeDescription={activeDescription} 
                    datosVersion={datosVersion} 
                    dataPoke={dataPoke} 
                    setActiveDescription={setActiveDescription} 
                    tipos={tipos} 
                    habilidades={habilidades} 
                />
            </div>
            <Pie key={'pie'} />
        </>
        
 
    )
}

export default Dashboard;