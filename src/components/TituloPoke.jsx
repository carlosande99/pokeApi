import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { Link } from "react-router-dom";
import useAntes from '../hooks/useAntes.js';
import useDespu from '../hooks/useDespu.js';
function TituloPoke ({ data, handleChange }){
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
    const formattedId = String(data.id).padStart(4, '0');
    if(!antes) return <p className='colorLetras'>Cargando datos...</p>
    if(!desp) return <p className='colorLetras'>Cargando datos...</p>
    return (
        <>
            <div className='d-flex justify-content-between w-100'>
                    <Link to={`/Dashboard/${antes.name}`} state={buscar2} className='w-25 d-flex align-items-center justify-content-center bg-secondary btn sigAtr botones'>
                        <span className='me-2 float-start'>
                            <FontAwesomeIcon icon={faArrowRight} rotation={180} style={{color: "#000000",}} />                     
                        </span>
                        <span className='me-2'>
                            N.º{antes.id}
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
                        {
                            data.varieties.length != 1 ?(
                                <select className='form-select w-100 mb-2' onChange={handleChange}>
                                    {
                                        data.varieties.map((item, index) => (
                                            <option key={item + index} value={item.pokemon.name}>{item.pokemon.name.charAt(0).toUpperCase() + item.pokemon.name.slice(1)}</option>
                                        ))
                                    }
                                </select>
                            ): (
                                <>
                                </>
                            )
                        }
                    </div>
                    <Link to={`/Dashboard/${desp.name}`} state={buscar} className='w-25 d-flex align-items-center justify-content-center bg-secondary btn sigAtr botones'>                          
                        <div className='w-100'>
                            <span>
                                {
                                    desp ? (
                                        desp.name.charAt(0).toUpperCase() + desp.name.slice(1)
                                    ) : null
                                }            
                            </span>
                            <span>
                                N.º{desp.id}
                            </span>
                            <span>
                                <FontAwesomeIcon icon={faArrowRight} style={{color: "#000000"}} />  
                            </span>
                        </div>
                    </Link>
            </div>
        </>
    );
}   
export default TituloPoke;