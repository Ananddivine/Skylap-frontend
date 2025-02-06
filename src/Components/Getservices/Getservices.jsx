import React from "react";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap
import img1 from "../Assets/blue_screen.png";
import img2 from "../Assets/hing.png";
import img3 from "../Assets/hardisk.png";
import img4 from "../Assets/battry.png";
import img5 from "../Assets/keyboard.png";
import img6 from "../Assets/broken screen.png";
import img7 from "../Assets/eeee.jpg";
import img8 from "../Assets/bios.jpg";
import img9 from "../Assets/anti virus.png";
import './Getservices.css'

// Array of images with corresponding service names
const services = [
  { image: img1, name: "Blue Screen issue" },
  { image: img2, name: "Blue Screen issue" },
  { image: img3, name: "Hinges issue" },
  { image: img4, name: "hard disk issue" },
  { image: img5, name: "Battery issue" },
  { image: img6, name: "Keyboard issue" },
  { image: img7, name: "Screen Replacement" },
  { image: img8, name: "Fan issue" },
  { image: img9, name: "Bios issue" },
];

const Getservices = () => {
  return (
    <div className="container my-4">
      <h1 className="text-center mb-4">Our Services</h1> <div className="underliner"><span></span></div>    

      <div className="row">
        {services.map((service, index) => (
          <div key={index} className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
            <div className="p-2 text-center">
              {/* Service Name */}
              <h3 className="h5 mb-2">{service.name}</h3>

              {/* Service Image */}
              <img
                src={service.image}
                alt={service.name}
                className="img-fluid rounded shadow-sm transition-hover"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Getservices;
