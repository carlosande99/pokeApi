import {Outlet, Link} from 'react-router-dom';

const Layout = () => {
    return (
        <>
            <div className="header">
                <Link to="/">
                    <img src="/International_Pokémon_logo.svg.png"></img>
                </Link>
            </div>
            <nav>
                <Link to="/">G1 Kanto</Link>
        
                <Link to="/">G2 Johto</Link>
        
                <Link to="/">G3 Hoenn</Link>
        
                <Link to="/">G4 Sinnoh</Link>
            
                <Link to="/">G5 Unova</Link>
            
                <Link to="/">G6 Kalos</Link>
        
                <Link to="/">G7 Alola</Link>
            
                <Link to="/">G8 Galar/Hisui</Link>

                <Link to="/">G9 Paldea</Link>
            </nav>
            <Outlet/>
        </>
    )
}

export default Layout;