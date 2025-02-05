import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Slider from './Components/Slider/Slider';
import Navigation from './Components/Navbar/Navbar';
import { ShopContext, ShopContextProvider } from './Context/ShopContext';
import Home from './Pages/Home';
import SearchiItemDisplay from './Components/Searchitem/SearchiItemDisplay';
import Hero from './Components/Hero/Hero';


const App = () => {
  return (
    <BrowserRouter>
    <ShopContextProvider >
    <Navigation />
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/search' element={<Hero />} />
      <Route path='/slider' element={<Slider />}/>
      <Route path='/ShopContext' element={<ShopContext />} />
      <Route path='/searchitemsdisplay' element={<SearchiItemDisplay />} />
      
    </Routes>
    </ShopContextProvider>
    </BrowserRouter> 
  )
}

export default App
