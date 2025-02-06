import React, {useRef, useEffect, useState}from 'react'

import SearchResults from '../SearchResults/SearchResults.jsx';
import { useLocation } from 'react-router-dom';
import delllogo from '../../Components/Assets/delllogo.png';
import hplogo from '../../Components/Assets/hplogo.png';
import asuslogo from '../../Components/Assets/asuslogo.png';
import acerlogo from '../../Components/Assets/acerlogo.jpg';
import microsoftlog from '../../Components/Assets/microsoftlogo.png';
import applelogo from '../../Components/Assets/applelogo.jpg';
import './Hero.css';
import Products from '../../Pages/Products.jsx';
import axiosInstance from '../axiosInstance/axiosInstance.jsx';


const Hero = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchQuery = searchParams.get('search');
  const searchResultsRef = useRef(null);
  const [laptopModels, setAll_Product] = useState([]);

  
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axiosInstance.get('/api/products');
        console.log('Fetched products:', response.data);
        setAll_Product(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
  
    fetchProducts();
  }, []);
  

  
  
  // Check if searchQuery is null or empty
  const filteredModels = searchQuery
    ? laptopModels.filter(model =>
        isQueryMatch(model, searchQuery.toLowerCase())
      )
    : [];
  
 // Scroll to results section when searchQuery changes
 useEffect(() => {
  if (searchResultsRef.current && searchQuery) {
    // Delay the scroll to ensure the component has rendered
    setTimeout(() => {
      searchResultsRef.current.scrollIntoView({ behavior: 'smooth' });
    }, 300); // Adjust delay as necessary
  }
}, [searchQuery]);

console.log('Search Query:', searchQuery);
console.log('Filtered Models:', filteredModels);
  
  console.log('Search Query:', searchQuery);
  console.log('Filtered Models:', filteredModels);

  return (
    <div>
     

        <div className='hero'>
    
    <h1>SkyLap Service The Excellence</h1>
    <p className='hero-items'>Explore the vast galaxy of cutting-edge laptops that redefine performance and innovation.</p>
    {searchQuery && (
      <SearchResults searchResults={filteredModels} searchParams={searchParams} ref={searchResultsRef}>
        <Products laptopModels={filteredModels} />
      </SearchResults>
    )}
    

 <section className='section'>
 <div className='row'>
 <div className='colums'>
 <h1>About <b>Us</b></h1>
 <div className="underline"><span></span></div>
 <p>Skylap is a leading Laptop Service Center in Bangalore which deals with Major laptop brands like Dell, Lenovo, Acer, Toshiba, Sony, Hp, Asus,
   Samsung. Skylap supplies IT products to many leading companies and institutions. Also provides quality service to many individuals as well as to companies
   on AMC basis.We have excellent 13 years of experienced technicians.and skylap products are provided with the warranty and geniuen spars reaplacement for
   the best perfamans to the laptop.We fixes Allmost 99.9% laptop get repaired with the afordable prices .Skylap provides life to your laptop.</p>
 </div>
  <div className='colums'>
    <h1>Our Service</h1>
 <div className="underline"><span></span></div>

    <div className="skills-bar">
  <p>Laptop <b>service</b></p>
  <div className="progress">
    <div className="progress-bar" style={{ width: '96%' }}>96%</div>
  </div>
  <p>CUSTOMER <b> SATISFACTION</b></p>
  <div className="progress">
    <div className="progress-bar" style={{ width: '98%' }}>98%</div>
  </div>
  <p>TRUST ON <b>SKYLAP</b></p>
  <div className="progress">
    <div className="progress-bar" style={{ width: '100%' }}>100%</div>
  </div>
</div>
       </div>   
       </div>
     </section>
    
 {/*-------------ICONS----------------------*/}

 <div className='icons row'>
<div className='col-md-2 col-4'>
  <img src={delllogo} alt='Dell logo' />
</div>
<div className='col-md-2 col-4'>
  <img src={hplogo} alt='HP logo' />
</div>
<div className='col-md-2 col-4'>
  <img src={asuslogo} alt='Asus logo' />
</div>
<div className='col-md-2 col-4'>
  <img src={acerlogo} alt='Acer logo' />
</div>
<div className='col-md-2 col-4'>
  <img src={microsoftlog} alt='Windows logo' />
</div>
<div className='col-md-2 col-4'>
  <img src={applelogo} alt='Apple logo' />
</div>
 </div>    
  </div>
    </div>
  )
}
 function isQueryMatch(model, searchQuery) {
      const queryWords = searchQuery.split(/\s+/); // Split the query into words
      
      // Check if any word in the query is present in the model's name or description
      return queryWords.some(word =>
        (model.name && model.name.toLowerCase().includes(word)) ||
        (model.description && model.description.toLowerCase().includes(word))
      );
  }
  
export default Hero;