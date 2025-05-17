import React from "react";
import "./AboutSection.css";

const AboutSection = () => {
  return (
    <section id="about" className="about-section">
      <div className="section-container">
        <h2 className="section-title">About Hero's Journey</h2>
        <div className="about-content">
          <div className="about-image">
            <img src="/images/about.svg" alt="Shop Interior" />
          </div>
          <div className="about-text">
            <p>
              Hero's Journey is more than just a game shop - we're a community
              hub for players of all ages and experience levels. From Magic: The
              Gathering to Pokemon, D&D to board games, we offer products, play
              space, and events that bring gamers together.
            </p>
            <p>
              Founded in 2018 by passionate gamers, our mission is to create an
              inclusive, welcoming environment where adventures are shared and
              friendships are forged through the power of games.
            </p>
            <p>
              Whether you're a seasoned pro or just starting your gaming
              journey, our knowledgeable staff is here to help you find exactly
              what you need to make your next game night legendary.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
