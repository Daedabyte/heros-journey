import React, { useState, useEffect, useRef } from "react";
import AnnouncementBanner from "../AnnouncementBanner/AnnouncementBanner";
import "./Header.css";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("home");
  const [showAnnouncement, setShowAnnouncement] = useState(false);
  const navRef = useRef(null);

  useEffect(() => {
    if (localStorage.getItem("announcementClosed") === "true") {
      setShowAnnouncement(false);
    }
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

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        navRef.current &&
        !navRef.current.contains(event.target) &&
        isMenuOpen
      ) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  // Handle smooth scrolling with header offset
  const handleNavClick = (e, targetId) => {
    e.preventDefault();
    closeMenu();

    const targetSection = document.getElementById(targetId);
    if (targetSection) {
      // Get header height to use as offset
      const headerHeight = document.getElementById("main-nav").offsetHeight;

      // Calculate position to scroll to
      const targetPosition = targetSection.offsetTop - headerHeight;

      // Scroll with smooth behavior
      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });
    }
  };

  const closeAnnouncement = () => {
    console.log("Closing announcement..."); // Add this debug line
    setShowAnnouncement(false);
    localStorage.setItem("announcementClosed", "true");

    // Add padding to main-nav after announcement is closed
    const mainNav = document.getElementById("main-nav");
    if (mainNav) {
      mainNav.style.paddingTop = "1rem";
    }
  };

  return (
    <>
      <nav
        id="main-nav"
        className={!showAnnouncement ? "announcement-closed" : ""}
      >
        {showAnnouncement && <AnnouncementBanner onClose={closeAnnouncement} />}
        <div className="nav-container">
          <div className="logo">
            <img src="/images/1.svg" alt="Hero's Journey Logo" />
          </div>
          <div
            ref={navRef}
            className={`nav-links ${isMenuOpen ? "active" : ""}`}
            id="nav-links"
          >
            <button
              className="close-mobile-nav"
              onClick={closeMenu}
              aria-label="Close navigation menu"
            >
              <i className="fas fa-times"></i>
            </button>
            <a
              href="#home"
              className={activeLink === "home" ? "active" : ""}
              onClick={(e) => handleNavClick(e, "home")}
            >
              Home
            </a>
            <a
              href="#about"
              className={activeLink === "about" ? "active" : ""}
              onClick={(e) => handleNavClick(e, "about")}
            >
              About
            </a>
            <a
              href="#products"
              className={activeLink === "products" ? "active" : ""}
              onClick={(e) => handleNavClick(e, "products")}
            >
              Inside the Case
            </a>
            <a
              href="#events"
              className={activeLink === "events" ? "active" : ""}
              onClick={(e) => handleNavClick(e, "events")}
            >
              Events
            </a>
            <a
              href="#visit"
              className={activeLink === "visit" ? "active" : ""}
              onClick={(e) => handleNavClick(e, "visit")}
            >
              Visit Us
            </a>
          </div>
          <div className="menu-toggle" id="menu-toggle" onClick={toggleMenu}>
            <i className={`fas ${isMenuOpen ? "fa-times" : "fa-bars"}`}></i>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
