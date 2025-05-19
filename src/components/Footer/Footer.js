import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer>
      <div className="footer-container">
        <div className="footer-logo">
          <img src="/images/hj-logo-with-name.png" alt="Hero's Journey Logo" />
        </div>
        <div className="footer-links">
          <a href="#home">Home</a>
          <a href="#about">About</a>
          <a href="#products">Inside the Case</a>
          <a href="#events">Events</a>
          <a href="#visit">Visit Us</a>
        </div>
        <div className="social-links">
          <a
            href="https://www.facebook.com/profile.php?id=61571938187668"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fab fa-facebook"></i>
          </a>
          <a href="#">
            <i className="fab fa-instagram"></i>
          </a>
          <a
            href="https://discord.gg/QPjjWGeAuK"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fab fa-discord"></i>
          </a>
        </div>
        <p className="copyright">
          © {new Date().getFullYear()} Hero's Journey. All rights reserved.
        </p>
        <p className="design-credit">
          Website Designed and Developed by{" "}
          <a
            href="https://www.daedabyte.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            Daedabyte
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
