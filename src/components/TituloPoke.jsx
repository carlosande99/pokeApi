import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { Link } from "react-router-dom";
import useAntes from '../hooks/useAntes.js';
import useDespu from '../hooks/useDespu.js';
import {formatearNum} from '../utils/formatearNum.js'
function TituloPoke ({ data, handleChange, selectedIndex }){
    const {antes} = useAntes(data)
    const {desp} = useDespu(data)
    let buscar = null
    let buscar2 = null
    if(desp){
        buscar = desp.id;
    }
    if(antes){
        buscar2 = antes.id
    }

    if(!antes) return <p className='colorLetras'>Cargando datos...</p>
    if(!desp) return <p className='colorLetras'>Cargando datos...</p>
    return (
        <>
            <div className='tituloPoke'>
                    <Link to={`/Dashboard/${antes.name}`} state={buscar2} className='bg-secondary btn sigAtr botones'>
                        <span key="arrow-left" className='me-2 float-start'>
                            <FontAwesomeIcon icon={faArrowRight} rotation={180} style={{color: "#000000",}} />                     
                        </span>
                        <div>
                            <span key="id-prev" className='me-2'>
                                N.º {formatearNum(antes)}
                            </span>
                            <span key="name-prev" className='me-2'>
                                {
                                    antes ? (
                                        antes.name.charAt(0).toUpperCase() + antes.name.slice(1)
                                    ): null
                                    
                                }
                            </span>
                        </div>
                    </Link>
                    <div id='titulo' key="titulo-container">
                        {/* titulo */}
                        <h2 key={'h2'} className='colorLetras'>{data.name.charAt(0).toUpperCase() + data.name.slice(1)} N.º {formatearNum(data)}</h2>
                        {
                            data.varieties.length !== 1 ?(
                                <select className='form-select w-100 mb-2' onChange={handleChange} value={selectedIndex} key="varieties-select">
                                    {
                                        data.varieties.map((item, index) => ( 
                                            <option key={`variety-${index}`} value={item.pokemon.name}>
                                                {item.pokemon.name.charAt(0).toUpperCase() + item.pokemon.name.slice(1)}
                                            </option>
                                        ))
                                    }
                                </select>
                            ): (
                                <>
                                </>
                            )
                        }
                    </div>
                     <Link to={`/Dashboard/${desp.name}`} state={buscar} className='bg-secondary btn sigAtr botones'>
                        <div>
                            <span key="id-next" className='ms-2'>
                                    N.º {formatearNum(desp)}
                            </span>                          
                                <span key="name-next" className='ms-2'>
                                    {
                                        desp ? (
                                            desp.name.charAt(0).toUpperCase() + desp.name.slice(1)
                                        ) : null
                                    }            
                            </span>
                        </div>
                        <span key="arrow-right" className='ms-2 float-end'>
                            <FontAwesomeIcon icon={faArrowRight} style={{color: "#000000"}} />  
                        </span>
                    </Link>
            </div>
        </>
    );
}   
export default TituloPoke;