import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Slider from './Components/Slider/Slider';
import Navigation from './Components/Navbar/Navbar';
import { ShopContext, ShopContextProvider } from './Context/ShopContext';
import Home from './Pages/Home';


const App = () => {
  return (
    <BrowserRouter>
    <ShopContextProvider >
    <Navigation />
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/slider' element={<Slider />}/>
      <Route path='/ShopContext' element={<ShopContext />} />
    </Routes>
    </ShopContextProvider>
    </BrowserRouter> 
  )
}

export default App
