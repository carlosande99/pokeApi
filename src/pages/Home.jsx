import '../css/App.css';
import '../css/home.css';
import { Pie } from './Pie';
import { Link } from "react-router-dom";
import useApiRegion from "../hooks/useApiRegion";
import { useBackground } from '../hooks/useBackground';

function Component() {
    const {data, loading, error} = useApiRegion(null);

    useBackground()

      if (loading) return <p className="colorLetras">Cargando...</p>;
      if (error) return <p className="colorLetras">Error: {error}</p>;

      const regiones = [];
      for (let i = data.results.length; i <= data.results.length; i++) {
          const grupo = data.results.map((region, index) => (
              <li>
                <Link key={index} className="colorLetras" to="/Pokemons" state={region.name}>
                    <img src={require(`../assets/images/${region.name}.png`)} alt={`Región ${region.name}`} className="" />
                    <h4 className="colorLetras pt-2">{region.name[0].toUpperCase() + region.name.substring(1)}</h4>
                </Link>
              </li>
          ));
          
          regiones.push(
              <ul key={i} className="regiones">
                  {grupo}
              </ul>
          );
      }

    return (
      <>
      <div className='principal mt-3'>
        <div className="iniciales">
          {regiones}
        </div>
      </div>
        <Pie />
      </>
    )
}

export default Component;