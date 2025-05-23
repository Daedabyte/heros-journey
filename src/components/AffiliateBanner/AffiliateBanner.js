import React from "react";
import "./AffiliateBanner.css";

const AffiliateBanner = () => {
  return (
    <div className="affiliate-break no-padding-top">
      <div className="affiliate-logos-carousel">
        <div className="carousel-track">
          {/* Double the items for seamless infinite scroll */}
          <img src="/images/mtg-logo.png" alt="Magic: The Gathering Logo" />
          <img src="/images/pokemon-logo.png" alt="Pokemon Logo" />
          <img src="/images/dnd-logo.png" alt="Dungeons & Dragons Logo" />
          <img src="/images/lorcana-logo.png" alt="Lorcana Logo" />
          <img src="/images/one-piece-logo.png" alt="One Piece Logo" />
          <img src="/images/warhammer-logo.png" alt="Warhammer Logo" />
          {/* Duplicate items */}
          <img src="/images/mtg-logo.png" alt="Magic: The Gathering Logo" />
          <img src="/images/pokemon-logo.png" alt="Pokemon Logo" />
          <img src="/images/dnd-logo.png" alt="Dungeons & Dragons Logo" />
          <img src="/images/lorcana-logo.png" alt="Lorcana Logo" />
          <img src="/images/one-piece-logo.png" alt="One Piece Logo" />
          <img src="/images/warhammer-logo.png" alt="Warhammer Logo" />
        </div>
      </div>
    </div>
  );
};

export default AffiliateBanner;
