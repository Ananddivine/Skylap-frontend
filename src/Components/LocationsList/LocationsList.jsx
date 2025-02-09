import React from "react";
import { useNavigate } from "react-router-dom";

const locations = [
  "koramangala",
  "marathahalli",
  "whitefield",
  "electronic-city",
  "indiranagar",
  "banashankari",
];

const additionalText = `
Laptop Service Center in Whitefield | Laptop Service Center | Laptop Repair Center | HP Laptop Service Center | Best Laptop Repair Center near me | Dell Laptop Service Center | Lenovo Laptop Service Center | Acer Laptop Service Center | Best HP Laptop Repair Service Center in Bengaluru | Asus Laptop Service Center | Best Dell Laptop Repair Center in Bengaluru | Best HP Service Center in Bangalore | Best Lenovo Service Center in Bangalore | Best Dell Service Center in Bangalore | HP Service Center in Bangalore | Lenovo Service Center in Bangalore | Dell Service Center in Bangalore | Best Lenovo Laptop Repair Service Center Near You in Bengaluru.
`;

const LocationsList = () => {
  const navigate = useNavigate();

  const handleLocationClick = (loc) => {
    navigate(`/laptop-service-center-in/${loc}`);
  };

  return (
    <div className="max-w-3xl mx-auto px-6 md:px-10 py-6 w-full text-center">
      {/* Heading */}
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        Find a Laptop Service Center Near You
      </h2>

      {/* Locations */}
      <p className="text-gray-700 leading-relaxed">
        {locations
          .map((loc, index) => (
            <span
              key={index}
              className="cursor-pointer text-blue-600 hover:underline font-medium"
              onClick={() => handleLocationClick(loc)}
            >
              Laptop Service Center near {loc.replace("-", " ")}
            </span>
          ))
          .reduce((prev, curr) => [prev, " | ", curr])}
      </p>

      {/* Additional Text */}
      <p className="text-gray-600 mt-6 leading-relaxed">
        {additionalText}
      </p>
    </div>
  );
};

export default LocationsList;
