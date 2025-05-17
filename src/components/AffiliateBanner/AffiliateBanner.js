import React from "react";
import "./AffiliateBanner.css";

const AffiliateBanner = () => {
  return (
    <div className="affiliate-break no-padding-top">
      <div className="affiliate-logos-carousel">
        <div className="carousel-track">
          {/* Double the items for seamless infinite scroll */}
          <img src="mtg-logo.png" alt="Magic: The Gathering Logo" />
          <img src="pokemon-logo.png" alt="Pokemon Logo" />
          <img src="dnd-logo.png" alt="Dungeons & Dragons Logo" />
          <img src="lorcana-logo.png" alt="Lorcana Logo" />
          {/* Duplicate items */}
          <img src="mtg-logo.png" alt="Magic: The Gathering Logo" />
          <img src="pokemon-logo.png" alt="Pokemon Logo" />
          <img src="dnd-logo.png" alt="Dungeons & Dragons Logo" />
          <img src="lorcana-logo.png" alt="Lorcana Logo" />
        </div>
      </div>
    </div>
  );
};

export default AffiliateBanner;
