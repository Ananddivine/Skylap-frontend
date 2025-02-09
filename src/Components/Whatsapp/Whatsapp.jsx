import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import "./whatsapp.css"; // Import CSS file

const Whatsapp = () => {
  const phoneNumber = "9606120007"; // Replace with your actual WhatsApp number
  const message = encodeURIComponent("Hello Skylap"); // Pre-filled message

  return (
    <a
      href={`https://wa.me/${phoneNumber}?text=${message}`} // WhatsApp chat link
      target="_blank"
      rel="noopener noreferrer"
      className="whatsapp-float"
    >
      <FontAwesomeIcon icon={faWhatsapp} size="2x" />
    </a>
  );
};

export default Whatsapp;
