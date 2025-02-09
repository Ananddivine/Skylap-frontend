import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css"; // Import CSS file

const Footer = () => {
  return (
    <footer className="footer">
      <h1 className="footer-logo">Sky<span>Lap</span></h1>
      
      <div className="footer-container">
        {/* Quick Access */}
        <div className="footer-column">
          <h2>Quick Access</h2>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/products">Products</Link></li>
            <li><Link to="/testimonials">Testimonial</Link></li>
            <li><Link to="/training">Laptop Repair Training</Link></li>
          </ul>
        </div>

        {/* Follow Us */}
        <div className="footer-column">
          <h2>Follow Us</h2>
          <ul>
            <li><a href="https://www.facebook.com/profile.php?id=100079945144540" target="_blank" rel="noopener noreferrer">Facebook</a></li>
            <li><a href="https://instagram.com/skylap_service?igshid=YmMyMTA2M2Y=" target="_blank" rel="noopener noreferrer">Instagram</a></li>
            <li><a href="/">YouTube</a></li>
            <li><a href="/">LinkedIn</a></li>
          </ul>
        </div>

        {/* Contact Us */}
        <div className="footer-column">
          <h2>Contact Us</h2>
          <ul>
            <li><a href="tel:+9606120007">Call: 9606120007</a></li>
            <li><a href="https://g.page/Skylap?share" target="_blank" rel="noopener noreferrer">Location</a></li>
            <li><a href="mailto:skylapwhitefield@gmail.com">Mail Us</a></li>
            <li><a href="https://wa.me/+919606120007" target="_blank" rel="noopener noreferrer">WhatsApp</a></li>
          </ul>
        </div>

        {/* More Links */}
        <div className="footer-column">
          <h2>More Links</h2>
          <ul>
            <li><Link to="/contact">Contact</Link></li>
            <li><Link to="/blog">Blogs</Link></li>
            <li><Link to="/#videos">Videos</Link></li>
            <li><Link to="/about">About Us</Link></li>
          </ul>
        </div>
      </div>

      {/* Copyright */}
      <div className="footer-bottom">
        <p>Copyright © {new Date().getFullYear()} All Rights Reserved - <Link to="/">Skylap</Link></p>
      </div>
    </footer>
  );
};

export default Footer;
