import BarChart from '../components/BarChart.jsx'
import TypesSpanish from '../components/types.jsx'
import { Link } from "react-router-dom";
function DatosPoke ({ data, descripcion, activeDescription, datosVersion, dataPoke, setActiveDescription, tipos, habilidades }){
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
                                                                <span key={`type-${index2}-${index}`} className={`background-color-`+type.name+` `+`pokemon-atributos btn me-1 mb-1`}>{type.name}</span>
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
                                                                <button key={`ability-${index}-${index2}`} className='btn btn-primary pokemon-atributos mb-1 me-1'>{type2.name}</button>
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
                            <BarChart stats={stats}/>
                        </div>
                        {/* ventajas y desventajas */}
                        <div id='venDesv'>
                            <TypesSpanish typesNames={tipos}/>
                        </div>
                    </div>
                </div>
        </>
    );
}
export default DatosPoke;