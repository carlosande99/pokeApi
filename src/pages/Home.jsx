import React, { useState, useEffect } from "react";
import '../css/App.css';
import '../css/home.css';
import { Pie } from './Pie';
import { Link } from "react-router-dom";
export default function Component() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
      document.documentElement.style.setProperty('--fondo-url', `url(/container_bg.png)`);
    })

    useEffect(() => {
        // Llamada a la API
        fetch("https://pokeapi.co/api/v2/region/")
          .then((response) => {
            if (!response.ok) {
              throw new Error("Error en la solicitud");
            }
            return response.json();
          })
          .then((data) => {
            setData(data);
            setLoading(false);
          })
          .catch((err) => {
            setError(err.message);
            setLoading(false);
          });
      }, []);
      if (loading) return <p>Cargando...</p>;
      if (error) return <p>Error: {error}</p>;

      const regiones = [];
      for (let i = 0; i < data.results.length; i += 3) {
          const grupo = data.results.slice(i, i + 3).map((region, index) => (
              <Link key={index} className="imagen-contenedor" to="/Pokemons" state={region.name}>
                  <img src={`${region.name}.png`} alt={`Región ${region.name}`} className="imagen-contenedor2" />
                  <h4>{region.name[0].toUpperCase() + region.name.substring(1)}</h4>
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