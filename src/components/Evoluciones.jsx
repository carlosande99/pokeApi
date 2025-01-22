import useEvo from "../hooks/useEvo";
import useEvoPoke from "../hooks/useEvoPoke";
import useTipo from "../hooks/useTipo";
import useVarieties from "../hooks/useVarieties";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAnglesRight } from '@fortawesome/free-solid-svg-icons';
function Evoluciones({data}){
    const [evoluciones] = useEvo(data);
    const datos = useEvoPoke(evoluciones)
    const poke = useVarieties(datos?.evoData[0]?.id || '')
    const poke2 = useVarieties(datos?.evoData[1]?.id || '')
    const poke3 = useVarieties(datos?.evoData[2]?.id || '')
    const tipo1 = useTipo(poke.pokemons)
    const tipo2 = useTipo(poke2.pokemons)
    const tipo3 = useTipo(poke3.pokemons)
    // Validaciones iniciales
    if(!evoluciones || !datos || !datos.evoData ) return null;
    console.log(datos)
    return (
        <>
            {evoluciones.chain.evolves_to.length > 0 && datos.evoData.length > 0 ? (
                evoluciones.chain.evolves_to.length === 1 ? (
                    <div className="d-flex w-100 justify-content-center">
                        <div className="evoluciones w-100">
                            <h3>Evoluciones</h3>
                            <div className="fotos">
                                {/* Primera evolución */}
                                {datos.evoData[0] && datos.evoData[0].id && (
                                    <div className="m-3">
                                        <div className="evo-fotos">
                                            <img 
                                                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${datos.evoData[0].id}.png`} 
                                                alt={evoluciones.chain.species.name} 
                                            />
                                        </div>
                                        <div>
                                            <span>{evoluciones.chain.species.name}</span>
                                            <p>N.º {String(datos.evoData[0].id).padStart(4, '0')}</p>
                                            <p>
                                                {
                                                    tipo1.tipos.map((type2, index2) => (
                                                        type2.names && type2.names.length > 0 ? (
                                                            type2.names.map((type, index) => (
                                                                type.language && type.language.name === 'es' ? (
                                                                    <span key={`type-${index2}-${index}`} className={`background-color-`+type.name+` `+`pokemon-atributos btn me-1 mb-1`}>{type.name}</span>
                                                                ): null
                                                            ))
                                                        ): null
                                                    ))
                                                }
                                            </p>
                                        </div>
                                    </div>
                                )}
                            <FontAwesomeIcon icon={faAnglesRight} size="2x"/>
                                {/* Segunda evolución */}
                                {datos.evoData[1] && datos.evoData[1].id && (
                                    <div className="m-3">
                                        <div className="evo-fotos">
                                            <img 
                                                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${datos.evoData[1].id}.png`} 
                                                alt={evoluciones.chain.evolves_to[0].species.name} 
                                            />
                                        </div>
                                        <div>
                                            <span>{evoluciones.chain.evolves_to[0].species.name}</span>
                                            <p>N.º {String(datos.evoData[1].id).padStart(4, '0')}</p>
                                            <p>
                                                {
                                                    tipo2.tipos.map((type2, index2) => (
                                                        type2.names && type2.names.length > 0 ? (
                                                            type2.names.map((type, index) => (
                                                                type.language && type.language.name === 'es' ? (
                                                                    <span key={`type-${index2}-${index}`} className={`background-color-`+type.name+` `+`pokemon-atributos btn me-1 mb-1`}>{type.name}</span>
                                                                ): null
                                                            ))
                                                        ): null
                                                    ))
                                                }
                                            </p>
                                        </div>
                                    </div>
                                )}
                            <FontAwesomeIcon icon={faAnglesRight} size="2x"/>
                                {/* Tercera evolución */}
                                {datos.evoData[2] && datos.evoData[2].id && 
                                evoluciones.chain.evolves_to[0].evolves_to.length > 0 && (
                                    <div className="m-3">
                                        <div className="evo-fotos">
                                            <img 
                                                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${datos.evoData[2].id}.png`}
                                                alt={evoluciones.chain.evolves_to[0].evolves_to[0].species.name} 
                                            />
                                        </div>
                                        <div>
                                            <span>{evoluciones.chain.evolves_to[0].evolves_to[0].species.name}</span>
                                            <p>N.º {String(datos.evoData[2].id).padStart(4, '0')}</p>
                                            <p>
                                                {
                                                    tipo3.tipos.map((type2, index2) => (
                                                        type2.names && type2.names.length > 0 ? (
                                                            type2.names.map((type, index) => (
                                                                type.language && type.language.name === 'es' ? (
                                                                    <span key={`type-${index2}-${index}`} className={`background-color-`+type.name+` `+`pokemon-atributos btn me-1 mb-1`}>{type.name}</span>
                                                                ): null
                                                            ))
                                                        ): null
                                                    ))
                                                }
                                            </p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                ) :
                    <div className="w-100">
                        <div className="evoluciones d-flex"> 
                            {
                                datos.evoData[0] && datos.evoData[0].id && (
                                    <div className="fotos w-25">
                                        <div className="m-3">
                                            <div className="evo-fotos">
                                                <img 
                                                    src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${datos.evoData[0].id}.png`} 
                                                    alt={evoluciones.chain.species.name} 
                                                />
                                            </div>
                                            <div>
                                                <span>{evoluciones.chain.species.name}</span>
                                                <p>N.º {String(datos.evoData[0].id).padStart(4, '0')}</p>
                                                <p>
                                                    {
                                                        tipo1.tipos.map((type2, index2) => (
                                                            type2.names && type2.names.length > 0 ? (
                                                                type2.names.map((type, index) => (
                                                                    type.language && type.language.name === 'es' ? (
                                                                        <span key={`type-${index2}-${index}`} className={`background-color-`+type.name+` `+`pokemon-atributos btn me-1 mb-1`}>{type.name}</span>
                                                                    ): null
                                                                ))
                                                            ): null
                                                        ))
                                                    }
                                                </p>
                                            </div>
                                        </div>
                                        <FontAwesomeIcon icon={faAnglesRight} size="2x"/> 
                                    </div>
                                )
                            }
                            <div className="muchas_evoluciones w-75">
                                {
                                    datos.evoData.map((type, index) => (
                                        index !== 0 && ( // Evitar el primer elemento
                                            <div key={type.id}>
                                                <div className="evo-fotos2">
                                                    <img 
                                                        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${type.id}.png`} 
                                                        alt={type.name} 
                                                    />
                                                </div>
                                                <div>
                                                    <span>{type.name}</span>
                                                    <p>N.º {String(type.id).padStart(4, '0')}</p>
                                                        {
                                                            tipo1.tipos.map((type2, index2) => (
                                                                type2.names && type2.names.length > 0 ? (
                                                                    type2.names.map((type, index) => (
                                                                        type.language && type.language.name === 'es' ? (
                                                                            <span key={`type-${index2}-${index}`} className={`background-color-`+type.name+` btn`}>{type.name}</span>
                                                                        ): null
                                                                    ))
                                                                ): null
                                                            ))
                                                        }
                                                </div>
                                            </div>
                                        )
                                    ))
                                }
                            </div> 
                        </div>
                    </div>
            ) : (
                // pokemos elegendarios
                <div className="d-flex w-100 justify-content-center">
                    <div className="evoluciones w-100">
                        <h3>Este Pokémon no tiene evoluciones</h3>
                        <div className="fotos">
                            {/* Pokemon legendario */}
                            {datos.evoData[0] && datos.evoData[0].id && (
                                <div className="m-3">
                                    <div className="evo-fotos">
                                        <img 
                                            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${datos.evoData[0].id}.png`} 
                                            alt={evoluciones.chain.species.name} 
                                        />
                                    </div>
                                    <div>
                                        <span>{evoluciones.chain.species.name}</span>
                                        <p>N.º {String(datos.evoData[0].id).padStart(4, '0')}</p>
                                        <p>
                                            {
                                                tipo1.tipos.map((type2, index2) => (
                                                    type2.names && type2.names.length > 0 ? (
                                                        type2.names.map((type, index) => (
                                                            type.language && type.language.name === 'es' ? (
                                                                <span key={`type-${index2}-${index}`} className={`background-color-`+type.name+` `+`pokemon-atributos btn me-1 mb-1`}>{type.name}</span>
                                                            ): null
                                                        ))
                                                    ): null
                                                ))
                                            }
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default Evoluciones;