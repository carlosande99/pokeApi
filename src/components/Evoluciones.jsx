import useEvo from "../hooks/useEvo";
import useEvoPoke from "../hooks/useEvoPoke";
import useTipo from "../hooks/useTipo";
function Evoluciones({data}){
    const [evoluciones] = useEvo(data);
    const datos = useEvoPoke(evoluciones)
    
    // Validaciones iniciales
    if(!evoluciones || !datos || !datos.evoData) return null;
    
    return (
        <>
            {evoluciones.chain.evolves_to.length > 0 && datos.evoData.length > 0 ? (
                <div className="d-flex w-100 justify-content-center">
                    <div className="evoluciones">
                        <h3>Evoluciones</h3>
                        <div className="fotos">
                            {/* Primera evolución */}
                            {datos.evoData[0] && datos.evoData[0].id && (
                                <div className="evo-fotos m-3">
                                    <img 
                                        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${datos.evoData[0].id}.png`} 
                                        alt={evoluciones.chain.species.name} 
                                    />
                                    <p>{evoluciones.chain.species.name}</p>
                                    <p>{datos.evoData[0].id}</p>
                                    <p>tipos</p>
                                </div>
                            )}

                            {/* Segunda evolución */}
                            {datos.evoData[1] && datos.evoData[1].id && (
                                <div className="evo-fotos m-3">
                                    <img 
                                        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${datos.evoData[1].id}.png`} 
                                        alt={evoluciones.chain.evolves_to[0].species.name} 
                                    />
                                    <p>{evoluciones.chain.evolves_to[0].species.name}</p>
                                    <p>{datos.evoData[1].id}</p>
                                    <p>tipos</p>
                                </div>
                            )}

                            {/* Tercera evolución */}
                            {datos.evoData[2] && datos.evoData[2].id && 
                             evoluciones.chain.evolves_to[0].evolves_to.length > 0 && (
                                <div className="evo-fotos m-3">
                                    <img 
                                        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${datos.evoData[2].id}.png`}
                                        alt={evoluciones.chain.evolves_to[0].evolves_to[0].species.name} 
                                    />
                                    <p>{evoluciones.chain.evolves_to[0].evolves_to[0].species.name}</p>
                                    <p>{datos.evoData[2].id}</p>
                                    <p>tipos</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            ) : (
                <div className="d-flex w-100 justify-content-center">
                    <div className="evoluciones">
                        <h3>Este Pokémon no tiene evoluciones</h3>
                        <div className="fotos">
                            {/* Pokemon legendario */}
                            {datos.evoData[0] && datos.evoData[0].id && (
                                <div className="evo-fotos m-3">
                                    <img 
                                        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${datos.evoData[0].id}.png`} 
                                        alt={evoluciones.chain.species.name} 
                                    />
                                    <p>{evoluciones.chain.species.name}</p>
                                    <p>{datos.evoData[0].id}</p>
                                    <p>tipos</p>
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