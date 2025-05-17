import React, { useState, useEffect } from "react";
import "./Header.css";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll("section");

      let current = "";
      sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        if (window.scrollY >= sectionTop - 200) {
          current = section.getAttribute("id");
        }
      });

      if (current) {
        setActiveLink(current);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav id="main-nav">
      <div className="nav-container">
        <div className="logo">
          <img src="1.svg" alt="Hero's Journey Logo" />
          <span className="logo-text">
            Hero's <span className="gold-text">Journey</span>
          </span>
        </div>
        <div
          className={`nav-links ${isMenuOpen ? "active" : ""}`}
          id="nav-links"
        >
          <a
            href="#home"
            className={activeLink === "home" ? "active" : ""}
            onClick={closeMenu}
          >
            Home
          </a>
          <a
            href="#about"
            className={activeLink === "about" ? "active" : ""}
            onClick={closeMenu}
          >
            About
          </a>
          <a
            href="#products"
            className={activeLink === "products" ? "active" : ""}
            onClick={closeMenu}
          >
            Products
          </a>
          <a
            href="#events"
            className={activeLink === "events" ? "active" : ""}
            onClick={closeMenu}
          >
            Events
          </a>
          <a
            href="#visit"
            className={activeLink === "visit" ? "active" : ""}
            onClick={closeMenu}
          >
            Visit Us
          </a>
        </div>
        <div className="menu-toggle" id="menu-toggle" onClick={toggleMenu}>
          <i className={`fas ${isMenuOpen ? "fa-times" : "fa-bars"}`}></i>
        </div>
      </div>
    </nav>
  );
};

export default Header;
