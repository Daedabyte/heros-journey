import React from "react";
import "./AnnouncementBanner.css";

const AnnouncementBanner = ({ onClose }) => {
  return (
    <div id="announcement-banner">
      <p>New Release: Pokémon Scarlet & Violet Booster Packs Now Available!</p>
      <button
        id="close-announcement"
        onClick={onClose}
        type="button"
        aria-label="Close announcement"
      >
        <i className="fas fa-times"></i>
      </button>
    </div>
  );
};

export default AnnouncementBanner;
