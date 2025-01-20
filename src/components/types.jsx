import React, { Component } from "react";
import filtrarVentajasYdesventajas from "../utils/QuitarDupli"
import { eliminarDuplicados } from "../utils/EliminarDuplicados";

class TypesSpanish extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            error: null,
            typesSpanish: {},
            ventajasYdesventajas: {},
            errorDuplicados: null,
            resultadoVentajas: [],
            resultadoDesventajas: []
        };
    }

    static getDerivedStateFromProps(props, state) {
        try {
            if (!props.typesNames || props.typesNames.length === 0) {
                return { errorDuplicados: 'No hay tipos para procesar' };
            }

            const array1 = state.ventajasYdesventajas?.double_damage_from || [];
            const array2 = state.ventajasYdesventajas?.half_damage_from || [];

            const [resultado1, resultado2] = eliminarDuplicados(array1, array2);

            return {
                errorDuplicados: null,
                resultadoVentajas: resultado2,
                resultadoDesventajas: resultado1
            };
        } catch (error) {
            return { errorDuplicados: `Error al procesar duplicados: ${error.message}` };
        }
    }

    componentDidMount() {
        // Función para obtener los tipos
        const fetchTypes = async () => {
            try {
                const response = await fetch("https://pokeapi.co/api/v2/type/");
                if (!response.ok) {
                    throw new Error("Error en la solicitud");
                }
                const data = await response.json();

                // Obtener los nombres de los tipos
                const promises = data.results.map(entry => {
                    return fetch(entry.url)
                        .then(response => {
                            if (!response.ok) {
                                throw new Error(`Error en la solicitud para obtener los nombres`);
                            }
                            return response.json();
                        });
                });

                const results = await Promise.all(promises);
                // mapa
                const map = results.reduce((acc, type) => {
                    const englishName = type.name;
                    const spanishName =
                        type.names.find((n) => n.language.name === "es")?.name ||
                        englishName;
                    acc[englishName] = spanishName;
                    return acc;
                }, {});

                this.setState({ typesSpanish: map });
            } catch (err) {
                this.setState({ error: err.message });
            } finally {
                this.setState({ loading: false });
            }
        };
        fetchTypes();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.typesNames !== this.props.typesNames) {
            const prueba = filtrarVentajasYdesventajas(this.props.typesNames);
            this.setState({ ventajasYdesventajas: prueba });
        }
    }

    render() {
        const { loading, error, typesSpanish, ventajasYdesventajas, errorDuplicados, resultadoVentajas, resultadoDesventajas } = this.state;
        const { typesNames } = this.props;

        if (loading) return <p className='colorLetras'>Cargando...</p>;
        if (error) return <p className='colorLetras'>Error: {error}</p>;
        if (!typesNames || typesNames.length === 0) return <p className='colorLetras'>No hay tipos disponibles.</p>;
        if (!ventajasYdesventajas || ventajasYdesventajas.length === 0) return <p className='colorLetras'>No hay tipos disponibles.</p>;

        if (errorDuplicados) return <p className='colorLetras'>Error: {errorDuplicados}</p>;

        return (
            <>    
                <div id="ventaja">
                    <p key={'p8'}><strong key={'strong6'}>Ventaja:</strong></p>
                    {
                        resultadoVentajas.map((type2, index2) => (
                            <span 
                                key={`ventaja-${type2}-${index2}`} 
                                className={`background-color-${typesSpanish[type2]} pokemon-atributos btn mb-1`}
                            >
                                {typesSpanish[type2] || "Desconocido"} 
                            </span>
                        ))
                    }
                </div>
                <div id='desventaja'>
                    <p key={'p7'}><strong key={'strong6'}>Desventaja:</strong></p>
                    {
                        resultadoDesventajas.map((type2, index2) => (
                            <span 
                                key={`desventaja-${type2}-${index2}`}
                                className={`background-color-${typesSpanish[type2]} pokemon-atributos btn mb-1`}
                            >
                                {typesSpanish[type2] || "Desconocido"} 
                            </span>
                        ))
                    }
                </div>
            </>
        );
    }
}

export default TypesSpanish;