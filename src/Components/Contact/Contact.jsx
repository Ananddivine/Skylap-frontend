import React, { useState } from "react";
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaClock } from "react-icons/fa";
import "./Contact.css"; // Importing the separate CSS file

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);
    alert("Message Sent Successfully!");
  };

  return (
    <div className="contact-container">
      <h1 className="contact-title">Contact Us</h1>

      <div className="contact-wrapper">
        {/* Contact Details */}
        <div className="contact-details">
          <h2>Get In Touch</h2>
          <p>If you have any questions, feel free to contact us. Our team will assist you as soon as possible.</p>

          <ul>
            <li>
              <FaMapMarkerAlt className="icon" /> 6/1,First floor, 63, Whitefield Main Rd, opposite to dress circle mall, above united farma, Whitefield, Bengaluru, Karnataka 560066
            </li>
            <li>
        <FaPhoneAlt className="icon" /> 
        <a href="tel:+919606120007" className="contact-link">+91 9606120007</a>
      </li>
      <li>
        <FaEnvelope className="icon" /> 
        <a href="mailto:WWW.Skylapwhitefield@gmail.com" className="contact-link">support@Skylap.com</a>
      </li>
            <li>
              <FaClock className="icon" /> Mon - Sat: 10:00 AM - 08:00 PM
            </li>
          </ul>
        </div>

        {/* Contact Form */}
        <div className="contact-form">
          <h2>Send a Message</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <textarea
              name="message"
              placeholder="Your Message"
              value={formData.message}
              onChange={handleChange}
              required
            ></textarea>
            <button type="submit">Send Message</button>
          </form>
        </div>
      </div>

      {/* Google Map */}
      <div className="map-container">
        <iframe
          title="Google Map"
          src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d1123.0133585695053!2d77.75016730731704!3d12.96951915004132!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae0d5f842f1f83%3A0x823ce2950a879f48!2sSkyLap%20Laptop%20service%20centre!5e0!3m2!1sen!2sin!4v1739097714907!5m2!1sen!2sin"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
};

export default Contact;
