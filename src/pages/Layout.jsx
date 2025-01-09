import {Outlet, Link} from 'react-router-dom';
import { BuscarPokemon } from '../utils/BuscarPokemon';
import useSearch from '../hooks/useSearch';
function Layout(){
    const {search, setSearch, error} = useSearch()

    const handleChange = (event) => {
        const newQuery = event.target.value
        if(newQuery.startsWith(' ')) return
        setSearch(event.target.value)
    }

    return (
        <>
            <div className="header">
                <Link to="/">
                    <img src={require('../assets/images/International_Pokémon_logo.svg.png')}></img>
                </Link>
            </div>
            <nav>
                <Link to="/" className='colorLetras'>G1 Kanto</Link>
        
                <Link to="/" className='colorLetras'>G2 Johto</Link>
        
                <Link to="/" className='colorLetras'>G3 Hoenn</Link>
        
                <Link to="/" className='colorLetras'>G4 Sinnoh</Link>
            
                <Link to="/" className='colorLetras'>G5 Unova</Link>
            
                <Link to="/" className='colorLetras'>G6 Kalos</Link>
        
                <Link to="/" className='colorLetras'>G7 Alola</Link>
            
                <Link to="/" className='colorLetras'>G8 Galar/Hisui</Link>

                <Link to="/" className='colorLetras'>G9 Paldea</Link>

                <Link to="/" className='colorLetras'>Pokédex Nacional</Link>
                
                <form className='form' onSubmit={BuscarPokemon}>
                    <div className='d-flex w-100 '>
                        <input className="form-control form-control-sm w-50 ms-3 me-1" type="text" placeholder="Nombre del pokémon..." 
                        aria-label=".form-control-sm example" name='buscar' value={search} onChange={handleChange}/>
                        <button type='submit' className='btn btn-secondary btn-sm'>Buscar</button>
                    </div>
                    {error && <span style={{color: 'red', fontSize: '12px'}}>{error}</span>}
                </form>
            </nav>
            <Outlet/>
        </>
    )
}

export default Layout;