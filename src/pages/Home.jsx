import '../css/App.css';
import '../css/home.css';
import { Pie } from './Pie';
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import useApiRegion from "../hooks/useApiRegion";
import { useBackground } from '../hooks/useBackground';

function Component() {
    const {data, loading, error} = useApiRegion(null);

    useBackground()

      if (loading) return <p className="colorLetras">Cargando...</p>;
      if (error) return <p className="colorLetras">Error: {error}</p>;

      const regiones = [];
      for (let i = 0; i < data.results.length; i += 3) {
          const grupo = data.results.slice(i, i + 3).map((region, index) => (
              <Link key={index} className="imagen-contenedor colorLetras" to="/Pokemons" state={region.name}>
                  <img src={require(`../assets/images/${region.name}.png`)} alt={`Región ${region.name}`} className="imagen-contenedor2" />
                  <h4 className="colorLetras">{region.name[0].toUpperCase() + region.name.substring(1)}</h4>
              </Link>
          ));
          
          regiones.push(
              <div key={i} className="regiones">
                  {grupo}
              </div>
          );
      }

    return (
      <>
        <div className="iniciales">
          {regiones}
        </div>
        <Pie />
      </>
    )
}

export default Component;