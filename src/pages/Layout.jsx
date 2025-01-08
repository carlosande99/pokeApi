import {Outlet, Link} from 'react-router-dom';
const Layout = () => {
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
                
                <div className='w-25'>
                    <input className="form-control form-control-sm w-75 ms-3" type="text" placeholder="Busque al pokemon por la id o nombre" aria-label=".form-control-sm example"/>
                </div>
            </nav>
            <Outlet/>
        </>
    )
}

export default Layout;