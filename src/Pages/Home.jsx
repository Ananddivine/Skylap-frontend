import React from "react";
import Hero from "../Components/Hero/Hero";
import Slider from "../Components/Slider/Slider";
import Getservices from "../Components/Getservices/Getservices";
import Testimonial from "../Components/Testimonial/Testimonial";

const Home = () => {


  return (
    <div>
      <Slider />
      <Hero />
      <Getservices />
      <Testimonial limit={3} />    
    </div>
  );
};

export default Home;
