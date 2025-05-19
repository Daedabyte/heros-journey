import React, { useState, useEffect } from "react";
import Header from "./components/Header/Header";
import HeroSection from "./components/HeroSection/HeroSection";
import AffiliateBanner from "./components/AffiliateBanner/AffiliateBanner";
import AboutSection from "./components/AboutSection/AboutSection";
import DiscordBanner from "./components/DiscordBanner/DiscordBanner";
import SectionBreak from "./components/SectionBreak/SectionBreak";
import ProductsSection from "./components/ProductsSection/ProductsSection";
import EventsSection from "./components/EventsSection/EventsSection";
import VisitSection from "./components/VisitSection/VisitSection";
import BackToTop from "./components/BackToTop/BackToTop";
import Footer from "./components/Footer/Footer";
import "./App.css";

function App() {
  useEffect(() => {
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

  return (
    <div className="App">
      <Header />
      <HeroSection />
      <AffiliateBanner />
      <AboutSection />
      <SectionBreak backgroundImage="/images/pokemon-counter.jpg" />
      <ProductsSection />
      <SectionBreak backgroundImage="/images/magic-counter.jpg" />
      <EventsSection />
      <SectionBreak backgroundImage="/images/table-game.jpg" />
      <VisitSection />
      <DiscordBanner />
      <BackToTop />
      <Footer />
    </div>
  );
}

export default App;
