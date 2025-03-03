import './css/App.css';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
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
      <Router>
        <Routes>
          <Route path="/" element={<Layout/>}>
            <Route path="/pokemons/:region" element={<Pokemons/>}/>
            <Route path="/" element={<Home/>}/>
            <Route path="/dashboard/:pokemon" element={<Dashboard/>}/>
            <Route path="/Nacional" element={<Nacional/>}/>
            <Route path='/Generacion/:generacion' element={<Generation/>}/>
            {/* <Route path="*" element={<Default/>}/> */}
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
