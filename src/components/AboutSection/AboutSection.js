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
              Welcome to Hero's Journey - Mount Jackson's Premier Card & Game
              Shop
            </p>
            <p>
              We're your local game store here in beautiful Mount Jackson, VA
              and the entire Shenandoah Valley! Discover our extensive
              collection of trading cards, including Magic: The Gathering
              singles, Pokémon cards, and more.
            </p>
            <p>
              Browse our regularly restocked sealed products from top card
              games, or bring your collection for trading with our passionate
              community. Check our weekly events calendar for Friday Night
              Magic, Pokémon League, D&D campaigns, and special tournaments!
            </p>
            <p>
              Whether you're a competitive player or just starting your gaming
              journey, we are here to help you find exactly what you need. Visit
              us today in downtown Mount Jackson and become part of our growing
              gaming family! Be sure to check out our calendar for upcoming
              events!
            </p>
            <p style={{ display: "none" }}>
              #MountJacksonVA #TradingCardGames #MagicTheGathering #PokemonCards
              #LocalGameStore #FridayNightMagic
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
