import React from "react";
import "./DiscordBanner.css";

const DiscordBanner = () => {
  return (
    <div className="discord-banner-container">
      <a
        href="https://discord.gg/QPjjWGeAuK"
        target="_blank"
        rel="noopener noreferrer"
        className="discord-button"
      >
        <div className="discord-banner">
          <h3>
            Join our Discord community for the latest updates!&nbsp;
            <i className="fa-brands fa-discord discord-logo"></i>
          </h3>
        </div>
      </a>
    </div>
  );
};

export default DiscordBanner;
