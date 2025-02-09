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
import Getservices from './Components/Getservices/Getservices';
import TestimonialsPage from "./Pages/TestimonialsPage";
import Ourservice from './Components/Ourservice/Ourservice';
import LocationPage from './Components/LocationsList/LocationPage';
import Whatsapp from './Components/Whatsapp/Whatsapp';
import Footer from './Components/Footer/Footer';
import Products from './Pages/Products';
import ShopCategory from './Pages/ShopCategory';
import Product from './Pages/Product';
import Productdisplay from './Components/Productdisplay/Productdisplay';
import About from './Pages/About';

const App = () => {
  return (
    <BrowserRouter>
    <ShopContextProvider >
    <Navigation />
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path="/laptop-service-center-in/:location" element={<Home />} />
      <Route path="/laptop-service-center-in/:location" element={<LocationPage />} />
      <Route path='/search' element={<Hero />} />
      <Route path='/slider' element={<Slider />}/>
      <Route path='/searchitemsdisplay' element={<SearchiItemDisplay />} />
      <Route path='/Getservice' element={<Getservices />} />
      <Route path="/testimonials" element={<TestimonialsPage />} />      
      <Route path='/ourservices' element={<Ourservice />} />
      <Route path='/Product' element={<Productdisplay />} />
      <Route path='/About' element={<About />} />
      <Route path='/products' element={<ShopCategory category="laptop" />} />
          <Route path='/products' element={<Products />} />
          <Route path='/*' element={<Home />} />
          <Route path='/product' element={<Product/>}>
            <Route path=":productId" element={<Product />} />
          </Route>
          <Route path='/ShopContext' element={<ShopContext />} />
          <Route path='/battery' element={<ShopCategory category="battery" />} />
          <Route path='/keyboard' element={<ShopCategory category="keyboard" />} />
          <Route path='/laptop' element={<ShopCategory category="laptop" />} />
    </Routes>
    <Whatsapp />
    <Footer />
    </ShopContextProvider>
    </BrowserRouter> 
  )
}

export default App
