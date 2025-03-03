import {Outlet, Link, useNavigate} from 'react-router-dom';
import useSearch from '../hooks/useSearch';
function Layout(){
    const {search, setSearch, error} = useSearch()
    const navigate = useNavigate();
    const handleChange = (event) => {
        // controlar lo que se escribe al momento
        const newQuery = event.target.value
        if(newQuery.startsWith(' ')) return
        setSearch(event.target.value)
    }

    const BuscarPokemon = (event) => {
        event.preventDefault()
        const {buscar} = Object.fromEntries(new window.FormData(event.target))
        if (buscar.trim()) {  // Verificamos que no esté vacío
            navigate(`/dashboard/${buscar.toLowerCase()}`); // Usamos el parámetro en la ruta
        }
    }
    return (
        <>
            <div className="header">
                <div>
                    <Link to="/">
                        <img src={require('../assets/images/International_Pokémon_logo.svg.png')} alt="logo" className='img-fluid'></img>
                    </Link>
                </div>
            </div>
            <nav className='navbar navbar-expand-lg'>
                <div className='container-fluid'>
                    <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" 
                    aria-controls="offcanvasNavbar" aria-label="Toggle navigation">
                        <span className='navbar-toggler-icon'></span>
                    </button>
                    <div className="offcanvas offcanvas-end" tabIndex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
                        <div className="offcanvas-header">
                            <h5 className="offcanvas-title" id="offcanvasNavbarLabel">Buscar pokémon por generaciones</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                        </div>
                        <div className='offcanvas-body align-items-center'>
                            <ul className='navbar-nav justify-content-center flex-grow-1'>
                                <li className='nav-item'>
                                    <Link to="/Generacion/1" className='nav-link orange' state="1">G1 Kanto</Link>
                                </li>
                                <li className='nav-item'>
                                    <Link to="/Generacion/2" className='nav-link orange' state="2">G2 Johto</Link>
                                </li>
                                <li className='nav-item'>
                                    <Link to="/Generacion/3" className='nav-link orange' state="3">G3 Hoenn</Link>
                                </li>
                                <li className='nav-item'>
                                    <Link to="/Generacion/4" className='nav-link orange' state="4">G4 Sinnoh</Link>
                                </li>
                                <li className='nav-item'>
                                    <Link to="/Generacion/5" className='nav-link orange' state="5">G5 Unova</Link>
                                </li>
                                <li className='nav-item'>
                                    <Link to="/Generacion/6" className='nav-link orange' state="6">G6 Kalos</Link>
                                </li>
                                <li className='nav-item'>
                                    <Link to="/Generacion/7" className='nav-link orange' state="7">G7 Alola</Link>
                                </li>
                                <li className='nav-item'>
                                    <Link to="/Generacion/8" className='nav-link orange' state="8">G8 Galar/Hisui</Link>
                                </li>
                                <li className='nav-item'>
                                    <Link to="/Generacion/9" className='nav-link orange' state="9">G9 Paldea</Link>
                                </li>
                                <li className='nav-item'>
                                    <Link to="/Nacional" className='nav-link orange'>Pokédex Nacional</Link>
                                </li>
                            </ul>    
                            <form className='d-flex mt-2 mt-lg-0' onSubmit={BuscarPokemon} role='search'>
                                <input className="form-control me-2" type="search" placeholder="Nombre del pokémon..." 
                                aria-label="Search" name='buscar' value={search} onChange={handleChange}/>
                                <button type='submit' className='btn btn-outline-success'>Buscar</button>
                                {error && <span style={{color: 'red', fontSize: '12px'}}>{error}</span>}
                            </form>     
                        </div>
                    </div>
                </div>
            </nav>
            <Outlet/>
        </>
    )
}

export default Layout;