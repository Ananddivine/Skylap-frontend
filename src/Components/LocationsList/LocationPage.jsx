import React from "react";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet";

const LocationPage = () => {
  const { location } = useParams();
  const formattedLocation = location.replace("-", " ");

  return (
    <div className="location-container">
      <Helmet>
        <title>Laptop Service Center near {formattedLocation} | Skylap</title>
        <meta
          name="description"
          content={`Looking for a laptop service center in ${formattedLocation}? Skylap offers expert laptop repair, screen replacement, and more.`}
        />
      </Helmet>
      <h1>Laptop Service Center near{formattedLocation}</h1>
      <p>Welcome to Skylap's service center near {formattedLocation}. We provide expert laptop repair and maintenance services in your area.</p>
    </div>
  );
};

export default LocationPage;
