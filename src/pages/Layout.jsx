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
                        <img src={require('../assets/images/International_Pokémon_logo.svg.png')} className='img-fluid'></img>
                    </Link>
                </div>
            </div>
            <nav className='navbar navbar-expand-lg'>
                <div className='container-fluid'>
                    <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" 
                    aria-controls="offcanvasNavbar" aria-label="Toggle navigation">
                        <span className='navbar-toggler-icon'></span>
                    </button>
                    <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
                        <div class="offcanvas-header">
                            <h5 class="offcanvas-title" id="offcanvasNavbarLabel">Buscar pokémon por generaciones</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                        </div>
                        <div className='offcanvas-body align-items-center'>
                            <ul className='navbar-nav justify-content-center flex-grow-1'>
                                <li className='nav-item'>
                                    <Link to="/" className='nav-link orange'>G1 Kanto</Link>
                                </li>
                                <li className='nav-item'>
                                    <Link to="/" className='nav-link orange'>G2 Johto</Link>
                                </li>
                                <li className='nav-item'>
                                    <Link to="/" className='nav-link orange '>G3 Hoenn</Link>
                                </li>
                                <li className='nav-item'>
                                    <Link to="/" className='nav-link orange'>G4 Sinnoh</Link>
                                </li>
                                <li className='nav-item'>
                                    <Link to="/" className='nav-link orange'>G5 Unova</Link>
                                </li>
                                <li className='nav-item'>
                                    <Link to="/" className='nav-link orange'>G6 Kalos</Link>
                                </li>
                                <li className='nav-item'>
                                    <Link to="/" className='nav-link orange'>G7 Alola</Link>
                                </li>
                                <li className='nav-item'>
                                    <Link to="/" className='nav-link orange'>G8 Galar/Hisui</Link>
                                </li>
                                <li className='nav-item'>
                                    <Link to="/" className='nav-link orange'>G9 Paldea</Link>
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