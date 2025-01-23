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
    const pokes = useVarieties(datos?.evoData || '');
    const tipos = useTipo(pokes.pokemons)
    // Validaciones iniciales
    if(!evoluciones || !datos || !datos.evoData ) return null;
    return (
        <>
            {evoluciones.chain.evolves_to.length > 0 && datos.evoData.length > 0 ? (
                evoluciones.chain.evolves_to.length === 1 ? (
                    <div className="w-100 mt-2 mb-2">
                        <div className="evoluciones w-100">
                            <h3>Evoluciones</h3>
                            <div className="fotos">
                                {/* Primera evolución */}
                                {datos.evoData[0] && datos.evoData[0].id && (
                                    <div className="m-3 evo-padre">
                                        <div className="evo-fotos">
                                            <img 
                                                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${datos.evoData[0].id}.png`} 
                                                alt={evoluciones.chain.species.name} 
                                            />
                                        </div>
                                        <div>
                                            <span className="text-white">{evoluciones.chain.species.name}</span>
                                            <p className="text-white-50">N.º {String(datos.evoData[0].id).padStart(4, '0')}</p>
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
                            <FontAwesomeIcon icon={faAnglesRight} size="2x" color="white"/>
                                {/* Segunda evolución */}
                                {datos.evoData[1] && datos.evoData[1].id && (
                                    <div className="m-3 evo-padre">
                                        <div className="evo-fotos">
                                            <img 
                                                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${datos.evoData[1].id}.png`} 
                                                alt={evoluciones.chain.evolves_to[0].species.name} 
                                            />
                                        </div>
                                        <div>
                                            <span className="text-white">{evoluciones.chain.evolves_to[0].species.name}</span>
                                            <p className="text-white-50">N.º {String(datos.evoData[1].id).padStart(4, '0')}</p>
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
                                {
                                    datos.evoData[2] && datos.evoData[2].id &&(
                                        <FontAwesomeIcon icon={faAnglesRight} size="2x" color="white"/>
                                    )
                                }
                                {/* Tercera evolución */}
                                {datos.evoData[2] && datos.evoData[2].id && 
                                evoluciones.chain.evolves_to[0].evolves_to.length > 0 && (
                                    <div className="m-3 evo-padre">
                                        <div className="evo-fotos">
                                            <img 
                                                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${datos.evoData[2].id}.png`}
                                                alt={evoluciones.chain.evolves_to[0].evolves_to[0].species.name} 
                                            />
                                        </div>
                                        <div>
                                            <span className="text-white">{evoluciones.chain.evolves_to[0].evolves_to[0].species.name}</span>
                                            <p className="text-white-50">N.º {String(datos.evoData[2].id).padStart(4, '0')}</p>
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
                    <div className="w-100 mt-2 mb-2">
                        <div className="evoluciones d-flex"> 
                            {
                                datos.evoData[0] && datos.evoData[0].id && (
                                    <div className="fotos w-25">
                                        <div className="m-3 evo-padre">
                                            <div className="evo-fotos">
                                                <img 
                                                    src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${datos.evoData[0].id}.png`} 
                                                    alt={evoluciones.chain.species.name} 
                                                />
                                            </div>
                                            <div className="evo-hijo">
                                                <span className="text-white">{evoluciones.chain.species.name}</span>
                                                <p className="text-white-50">N.º {String(datos.evoData[0].id).padStart(4, '0')}</p>
                                                <span>
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
                                                </span>
                                            </div>
                                        </div>
                                        <FontAwesomeIcon icon={faAnglesRight} size="2x" color="white"/> 
                                    </div>
                                )
                            }
                            <div className="muchas_evoluciones w-75">
                                {
                                    datos.evoData.map((type, index) => (
                                        index !== 0 && ( // Evitar el primer elemento
                                            <div key={type.id} className="evo-padre mb-3 mt-3">
                                                <div className="evo-fotos2">
                                                    <img 
                                                        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${type.id}.png`} 
                                                        alt={type.name} 
                                                    />
                                                </div>
                                                <div className="evo-padre">
                                                    <span className="text-white">{type.name}</span>
                                                    <span className="text-white-50">N.º {String(type.id).padStart(4, '0')}</span>
                                                        {
                                                            tipos.tipos[index] && (
                                                                tipos.tipos[index].map((type2, index2) => (
                                                                    type2.names.map((type3, index3) => (
                                                                        type3.language && type3.language.name === 'es' ? (
                                                                            <span key={`type-${index}-${index3}`} className={`background-color-`+type3.name+` btn`}>{type3.name}</span>
                                                                        ): null
                                                                    ))
                                                                ))
                                                            )
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
                <div className="w-100 mt-2 mb-2">
                    <div className="evoluciones w-100">
                        <h3>Este Pokémon no tiene evoluciones</h3>
                        <div className="fotos">
                            {/* Pokemon legendario */}
                            {datos.evoData[0] && datos.evoData[0].id && (
                                <div className="m-3 evo-padre">
                                    <div className="evo-fotos">
                                        <img 
                                            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${datos.evoData[0].id}.png`} 
                                            alt={evoluciones.chain.species.name} 
                                        />
                                    </div>
                                    <div>
                                        <span className="text-white">{evoluciones.chain.species.name}</span>
                                        <p className="text-white-50">N.º {String(datos.evoData[0].id).padStart(4, '0')}</p>
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