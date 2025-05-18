import React from "react";
import "./HeroSection.css";

const HeroSection = () => {
  return (
    <section id="home" className="hero-section">
      <div className="video-background">
        <video autoPlay muted loop playsInline className="hero-video">
          <source src="/videos/hero-background.mp4" type="video/mp4" />
          {/* Fallback to the original GIF if video fails to load */}
          Your browser does not support the video tag.
        </video>
        <div className="video-overlay"></div>
      </div>
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
