import React from "react";
import "./HeroSection.css";

const HeroSection = () => {
  return (
    <section id="home" className="hero-section">
      <div className="hero-content">
        <div className="hero-text">
          <img src="/images/hj-logo-with-name.png" alt="Hero's Journey Logo" />
          <h1>Your Adventure Begins Here</h1>
          <p>Cards, Games, and Community for All Players</p>
          <a href="#products" className="cta-button">
            Explore Our Products
          </a>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
