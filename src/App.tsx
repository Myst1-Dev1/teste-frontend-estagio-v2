import React from 'react';
import Home from './pages/home';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Header from './components/header';
import 'bootstrap/dist/css/bootstrap.css';
import Map from './pages/Map';
import Historico from './pages/historico';
import MapId from './pages/MapId';

function App() {
  return (
    //  <Home/>
    <BrowserRouter>
    {/* <Header/> */}
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/map' element={<Map/>}/>
        <Route path='/historico/:id' element={<Historico/>}/>
        <Route path='/map/:id' element={<MapId/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
