import './css/App.css';
import { Routes, Route } from 'react-router-dom';
import Layout from './pages/Layout';
import Pokemons from './pages/Pokemons';
import Home from './pages/Home';
import Default from './pages/Default';
import Dashboard from './pages/Dashboard';
import Nacional from './pages/Nacional';
import Generation from './pages/Generation';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
function App() {
  return (
    <>
      <Routes>
        <Route path="/pokeApi/" element={<Layout/>}>
          <Route path="/pokeApi/pokemons/:region" element={<Pokemons/>}/>
          <Route path="/pokeApi/" element={<Home/>}/>
          <Route path="/pokeApi/dashboard/:pokemon" element={<Dashboard/>}/>
          <Route path="/pokeApi/Nacional" element={<Nacional/>}/>
          <Route path='/pokeApi/Generacion/:generacion' element={<Generation/>}/>
          {/* <Route path="*" element={<Default/>}/> */}
        </Route>
      </Routes>
    </>
  );
}

export default App;
