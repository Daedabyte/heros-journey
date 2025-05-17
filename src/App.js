import React, { useState, useEffect } from "react";
import Header from "./components/Header/Header";
import AnnouncementBanner from "./components/AnnouncementBanner/AnnouncementBanner";
import HeroSection from "./components/HeroSection/HeroSection";
import AffiliateBanner from "./components/AffiliateBanner/AffiliateBanner";
import AboutSection from "./components/AboutSection/AboutSection";
import SectionBreak from "./components/SectionBreak/SectionBreak";
import ProductsSection from "./components/ProductsSection/ProductsSection";
import EventsSection from "./components/EventsSection/EventsSection";
import VisitSection from "./components/VisitSection/VisitSection";
import BackToTop from "./components/BackToTop/BackToTop";
import Footer from "./components/Footer/Footer";
import "./App.css";

function App() {
  const [showAnnouncement, setShowAnnouncement] = useState(true);

  useEffect(() => {
    // Check if announcement was previously closed
    if (localStorage.getItem("announcementClosed") === "true") {
      setShowAnnouncement(false);
    }

    // Initialize section animations
    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.1,
    };

    const sectionObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("appear");
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    document.querySelectorAll("section").forEach((section) => {
      sectionObserver.observe(section);
    });

    // Make first section visible immediately
    const firstSection = document.querySelector("section");
    if (firstSection) {
      firstSection.classList.add("appear");
    }
  }, []);

  const closeAnnouncement = () => {
    setShowAnnouncement(false);
    localStorage.setItem("announcementClosed", "true");
  };

  return (
    <div className="App">
      {showAnnouncement && <AnnouncementBanner onClose={closeAnnouncement} />}
      <Header />
      <HeroSection />
      <AffiliateBanner />
      <AboutSection />
      <SectionBreak backgroundImage="pokemon-counter.jpg" />
      <ProductsSection />
      <SectionBreak backgroundImage="magic-counter.jpg" />
      <EventsSection />
      <SectionBreak backgroundImage="table-game.jpg" />
      <VisitSection />
      <BackToTop />
      <Footer />
    </div>
  );
}

export default App;
