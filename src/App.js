import './css/App.css';
import { Routes, Route } from 'react-router-dom';
import Layout from './pages/Layout';
import Pokemons from './pages/Pokemons';
import Home from './pages/Home';
import Default from './pages/Default';
import Dashboard from './pages/Dashboard';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout/>}>
          <Route path="pokemons" element={<Pokemons/>}/>
          <Route path="/" element={<Home/>}/>
          <Route path="dashboard" element={<Dashboard/>}/>
          <Route path="*" element={<Default/>}/>
        </Route>
      </Routes>
    </>
  );
}

export default App;
