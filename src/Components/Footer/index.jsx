import React from 'react';
import './index.css';

export function Footer() {
  return (
    <footer className="footer">
      {/* Section 1: Response Box */}
      <div className="footer-section response-box">
        <h3>Contact Us</h3>
        <form className="response-form">
          <input type="text" placeholder="Your message..." />
          <button type="submit">Send</button>
        </form>
      </div>

      {/* Section 2: Map */}
      <div className="footer-section map-section">
        <h3>Live Location</h3>
        <div className="map-container">
          <iframe
            title="Live Map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3979.9897185963946!2d9.734157515106023!3d4.022500748283698!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x10610d3e7edd1fa1%3A0x1bff932e53cda125!2s%C3%89glise%20Catholique%20De%20Bilongu%C3%A9!5e0!3m2!1sfr!2scm!4v1678938366903!5m2!1sfr!2scm"
            loading="lazy"
            allowFullScreen
          ></iframe>
        </div>
      </div>

      {/* Section 3: Social Media */}
      <div className="footer-section social-media">
        <h3>Follow Us</h3>
        <div className="icons">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-facebook-f"></i>
          </a>
          <a href="https://whatsapp.com" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-whatsapp"></i>
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-instagram"></i>
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-twitter"></i>
          </a>
        </div>

        
      </div>

      
      
    </footer>
  );
}
