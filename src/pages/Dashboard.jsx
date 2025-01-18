import { useLocation, useParams } from 'react-router-dom';
import { useState } from "react";
import '../css/App.css';
import '../css/lista.css';
import { Pie } from './Pie';
import { useBackground } from '../hooks/useBackground';
import DatosPoke from '../components/DatosPoke.jsx';
import TituloPoke from '../components/TituloPoke.jsx';
// hooks
import usePokeSpe from '../hooks/usePokeSpe.js';
import usePokeVari from '../hooks/usePokeVari.js';
import useDescrip from '../hooks/useDescrip.js';
import useButDes from '../hooks/useButDes.js';
import useAbility from '../hooks/useAbility.js';
import useTipo from '../hooks/useTipo.js';
import useVarieties from '../hooks/useVarieties.js';

function Dashboard() {
    const [selectedIndex, setSelectIndex] = useState(0);
    const {pokemon} = useParams();
    const location = useLocation();
    const [activeDescription, setActiveDescription] = useState(0);
    const {data, error, loading} = usePokeSpe(location.state, pokemon)
    const {dataPoke} = usePokeVari(data)
    const {descripcion, version} = useDescrip(data)
    const {datosVersion} = useButDes(version)
    const {habilidades} = useAbility(dataPoke)
    const {tipos} = useTipo(dataPoke)
    const {pokemons} = useVarieties(selectedIndex); 

    function handleChange(event) {
        setSelectIndex(event.target.value)
        console.log(event.target.value)
    };

    useBackground()
    
    if (loading) return <p className='colorLetras'>Cargando...</p>;
    if (error) return <p className='colorLetras'>Error: {error}</p>;
    if(!data) return <p className='colorLetras'>Cargando datos...</p>
    if (!dataPoke) return <p className='colorLetras'>Cargando datos...</p>;
    if (!version) return <p className='colorLetras'>Cargando datos...</p>;
    if (!habilidades) return <p className='colorLetras'>Cargando datos...</p>;
    if(!datosVersion) return <p className='colorLetras'>Cargando datos...</p>
    return (
        <>
            <div className="datos1" key={'1'}>
                <TituloPoke
                    data={data}
                    handleChange={handleChange}
                />
                <DatosPoke 
                    data={data} 
                    descripcion={descripcion} 
                    activeDescription={activeDescription} 
                    datosVersion={datosVersion} 
                    dataPoke={dataPoke} 
                    setActiveDescription={setActiveDescription} 
                    tipos={tipos} 
                    habilidades={habilidades}
                    formas={pokemons}
                />
            </div>
            <Pie key={'pie'} />
        </>
    )
}

export default Dashboard;