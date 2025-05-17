import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer>
      <div className="footer-container">
        <div className="footer-logo">
          <img src="hero-journey-logo.png" alt="Hero's Journey Logo" />
          <span className="logo-text">
            Hero's <span className="gold-text">Journey</span>
          </span>
        </div>
        <div className="footer-links">
          <a href="#home">Home</a>
          <a href="#about">About</a>
          <a href="#products">Products</a>
          <a href="#events">Events</a>
          <a href="#visit">Visit Us</a>
        </div>
        <div className="social-links">
          <a href="#">
            <i className="fab fa-facebook"></i>
          </a>
          <a href="#">
            <i className="fab fa-instagram"></i>
          </a>
          <a href="#">
            <i className="fab fa-twitter"></i>
          </a>
          <a href="#">
            <i className="fab fa-discord"></i>
          </a>
        </div>
        <p className="copyright">
          © {new Date().getFullYear()} Hero's Journey. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
