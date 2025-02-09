import React, { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import Hero from "../Components/Hero/Hero";
import Slider from "../Components/Slider/Slider";
import Getservices from "../Components/Getservices/Getservices";
import Testimonial from "../Components/Testimonial/Testimonial";
import Ourservice from "../Components/Ourservice/Ourservice";
import LocationsList from "../Components/LocationsList/LocationsList";

const Home = () => {
  const { location } = useParams(); // Get location from URL
  const formattedLocation = location ? location.replace("-", " ") : null;
  const resultRef = useRef(null); // Reference to the results section

  // Scroll to results when a location is selected
  useEffect(() => {
    if (formattedLocation && resultRef.current) {
      resultRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [formattedLocation]);

  return (
    <div>
      <Slider />
      {formattedLocation && (
        <h2 className="text-center text-lg font-bold text-blue-600">
          Laptop Service Center in {formattedLocation}
        </h2>
      )}
      
      {/* Attach ref to scroll target */}
      <div ref={resultRef}>
        <Hero />
        <Getservices />
        <Testimonial limit={3} />
        <Ourservice />
      </div>

      <LocationsList />
    </div>
  );
};

export default Home;
