import useEvo from "../hooks/useEvo";
function Evoluciones({data}){
    const [evoluciones] = useEvo(data);
    if(!evoluciones) return
    return (
        <>
        {/* falta hacer las llamadas a los datos de cada evolucion */}
        {/* hacer la llamada a las evo necesarias en la que estas no */}
            {
                evoluciones.chain.evolves_to.length > 0 ?(
                    <div className="d-flex w-100 justify-content-center">
                        <div className="evoluciones">
                            <h3>Evoluciones</h3>
                            <div className="fotos">
                                <div className="evo-fotos m-3">
                                    <img 
                                        src={`https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/006.png`} 
                                        alt="" 
                                    />
                                    <p>{evoluciones.chain.species.name}</p>
                                    <p>id</p>
                                    <p>tipos</p>
                                </div>
                                <div className="evo-fotos m-3">
                                    <img 
                                        src={`https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/006.png`} 
                                        alt="" 
                                    />
                                    <p>{evoluciones.chain.evolves_to[0].species.name}</p>
                                    <p>id</p>
                                    <p>tipos</p>
                                </div>
                                {
                                    evoluciones.chain.evolves_to[0].evolves_to.length > 0 ? (
                                        <div className="evo-fotos m-3">
                                            <img 
                                                src={`https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/006.png`} 
                                                alt="" 
                                            />
                                            <p>{evoluciones.chain.evolves_to[0].evolves_to[0].species.name}</p>
                                            <p>id</p>
                                            <p>tipos</p>
                                        </div>
                                    ):
                                        <>
                                        </>
                                }
                            </div>
                        </div>
                    </div>
                ):
                    <>
                    </>
            }
        </>
    );
}
export default Evoluciones;