import React, { useState, useEffect, useRef } from "react";
import "./ProductsSection.css";

const ProductsSection = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [isMobile, setIsMobile] = useState(false);

  // Create refs to hold references to all cards
  const cardRefs = useRef([]);

  // Initialize the card refs when products change
  useEffect(() => {
    cardRefs.current = cardRefs.current.slice(0, filterProducts().length);

    // Check if device is mobile
    const checkMobile = () => {
      setIsMobile(window.matchMedia("(max-width: 768px)").matches);
    };

    // Initial check
    checkMobile();

    // Add event listener for window resize
    window.addEventListener("resize", checkMobile);

    // Cleanup
    return () => window.removeEventListener("resize", checkMobile);
  }, [activeCategory]);

  // Function to handle the tilt effect
  const handleTilt = (e, index) => {
    // Skip effect if on mobile
    if (isMobile) return;

    const card = cardRefs.current[index];
    if (!card) return;

    // Get the product to check if it should have holographic effect
    const product = filterProducts()[index];
    if (!product.isHolographic) {
      // If not holographic, just add a simple hover effect
      card.style.transform = "scale3d(1.07, 1.07, 1.07)";
      return;
    }

    const cardRect = card.getBoundingClientRect();
    const cardWidth = cardRect.width;
    const cardHeight = cardRect.height;

    // Calculate cursor position relative to the card center
    const centerX = cardRect.left + cardWidth / 2;
    const centerY = cardRect.top + cardHeight / 2;
    const mouseX = e.clientX - centerX;
    const mouseY = e.clientY - centerY;

    // Calculate rotation based on cursor position
    const rotateY = (mouseX / (cardWidth / 2)) * 15;
    const rotateX = -(mouseY / (cardHeight / 2)) * 15;

    // Apply the rotation transform
    card.style.transform = `perspective(1000px) rotateY(${rotateY}deg) rotateX(${rotateX}deg) scale3d(1.10, 1.10, 1.10)`;

    // Update the shine effect position
    const shine = card.querySelector(".card-shine");
    if (shine) {
      const angle = (Math.atan2(mouseY, mouseX) * 180) / Math.PI + 180;

      // Subtle, more transparent rainbow gradient
      shine.style.background = `
        radial-gradient(circle at ${50 + (mouseX / cardWidth) * 30}% ${
        50 + (mouseY / cardHeight) * 30
      }%, 
          rgba(255,255,255,0.4) 0%, 
          rgba(255,255,255,0.08) 25%, 
          rgba(255,255,255,0.02) 50%, 
          transparent 70%
        ),
        conic-gradient(
          from ${angle}deg,
          rgba(255,0,204,0.13), 
          rgba(51,51,255,0.10), 
          rgba(0,255,204,0.10), 
          rgba(255,255,0,0.10), 
          rgba(255,102,0,0.13), 
          rgba(255,0,204,0.13)
        )
      `;
      shine.style.opacity = "1";
      shine.style.mixBlendMode = "lighter";
    }
  };

  // Function to reset the card to its original position
  const resetTilt = (index) => {
    // Skip effect if on mobile
    if (isMobile) return;

    const card = cardRefs.current[index];
    if (!card) return;

    const product = filterProducts()[index];

    if (product.isHolographic) {
      // Smoothly transition back to the original state for holographic cards
      card.style.transform =
        "perspective(1000px) rotateY(0deg) rotateX(0deg) scale3d(1, 1, 1)";

      // Reset shine effect
      const shine = card.querySelector(".card-shine");
      if (shine) {
        shine.style.opacity = "0";
      }
    } else {
      // Reset regular cards
      card.style.transform = "scale3d(1, 1, 1)";
    }
  };

  const products = [
    {
      id: 1,
      name: "Iono's Bellibolt SIR",
      category: "pokemon",
      image: "/images/ionos.jpg",
      isHolographic: true,
      description:
        "One of the most powerful planeswalkers ever printed, Jace offers incredible versatility and control.",
    },
    {
      id: 2,
      name: "Salamence ex SIR",
      category: "pokemon",
      image: "/images/salamance.jpg",
      isHolographic: true,
      description:
        "One of the most powerful planeswalkers ever printed, Jace offers incredible versatility and control.",
    },
    {
      id: 3,
      name: "Raging Bolt ex SIR",
      category: "pokemon",
      image: "/images/raging-bolt.jpg",
      isHolographic: true,
      description:
        "One of the most powerful planeswalkers ever printed, Jace offers incredible versatility and control.",
    },
    {
      id: 4,
      name: "Charizard V AA",
      category: "pokemon",
      image: "/images/charizard.jpg",
      isHolographic: true,
      description:
        "One of the most powerful planeswalkers ever printed, Jace offers incredible versatility and control.",
    },
    {
      id: 5,
      name: "Umbreon Vmax AA",
      category: "pokemon",
      image: "/images/umbreon.jpg",
      isHolographic: true,
      description:
        "One of the most powerful planeswalkers ever printed, Jace offers incredible versatility and control.",
    },
    {
      id: 6,
      name: "Tyranitar V AA",
      category: "pokemon",
      image: "/images/tyranitar.jpg",
      isHolographic: true,
      description:
        "One of the most powerful planeswalkers ever printed, Jace offers incredible versatility and control.",
    },
    {
      id: 7,
      name: "Arceus Vstar Gold Crown Zenith",
      category: "pokemon",
      image: "/images/arceus.png",
      isHolographic: true,
      description:
        "One of the most powerful planeswalkers ever printed, Jace offers incredible versatility and control.",
    },
    {
      id: 8,
      name: "Sauron (movie poster style)",
      category: "magic",
      image: "/images/sauron-card.webp",
      description:
        "One of the most powerful planeswalkers ever printed, Jace offers incredible versatility and control.",
    },
    {
      id: 9,
      name: "Aurelia, the Law Above (Serialized)",
      category: "magic",
      image: "/images/aurelia-serialized.jpg",
      isHolographic: true,
      description:
        "One of the most powerful planeswalkers ever printed, Jace offers incredible versatility and control.",
    },
    {
      id: 10,
      name: "Tundra (revised)",
      category: "magic",
      image: "/images/tundra.jpg",
      description:
        "One of the most powerful planeswalkers ever printed, Jace offers incredible versatility and control.",
    },
    {
      id: 11,
      name: "Wheel of Fortune (revised)",
      category: "magic",
      image: "/images/wheel-of-fortune.jpg",
      description:
        "One of the most powerful planeswalkers ever printed, Jace offers incredible versatility and control.",
    },
    {
      id: 12,
      name: "Mox Opal (Scars of Mirrodin)",
      category: "magic",
      image: "/images/mox-opal.jpg",
      description:
        "One of the most powerful planeswalkers ever printed, Jace offers incredible versatility and control.",
    },
    {
      id: 13,
      name: "Mirror Universe (Legends)",
      category: "magic",
      image: "/images/mirror-universe.jpg",
      description:
        "One of the most powerful planeswalkers ever printed, Jace offers incredible versatility and control.",
    },
    {
      id: 14,
      name: "Ugin, Eye of the Storms (Tarkir)",
      category: "magic",
      image: "/images/ugin.jpg",
      description:
        "One of the most powerful planeswalkers ever printed, Jace offers incredible versatility and control.",
    },
  ];

  const filterProducts = () => {
    if (activeCategory === "all") {
      return products;
    }
    return products.filter((product) => product.category === activeCategory);
  };

  const setCategory = (category) => {
    setActiveCategory(category);
  };

  return (
    <section id="products" className="products-section">
      <div className="section-container">
        <h2 className="section-title">Inside the Case</h2>
        <div className="product-categories">
          <button
            className={`category-btn ${
              activeCategory === "all" ? "active" : ""
            }`}
            onClick={() => setCategory("all")}
          >
            All
          </button>
          <button
            className={`category-btn ${
              activeCategory === "magic" ? "active" : ""
            }`}
            onClick={() => setCategory("magic")}
          >
            Magic: The Gathering
          </button>
          <button
            className={`category-btn ${
              activeCategory === "pokemon" ? "active" : ""
            }`}
            onClick={() => setCategory("pokemon")}
          >
            Pokemon
          </button>
        </div>
        <div className="products-grid">
          {filterProducts().map((product, index) => (
            <div key={product.id} className="product-card-container">
              <div
                className={`product-card ${
                  product.isHolographic ? "holographic" : ""
                } ${isMobile ? "mobile" : ""}`}
                data-category={product.category}
                ref={(el) => (cardRefs.current[index] = el)}
                onMouseMove={(e) => handleTilt(e, index)}
                onMouseLeave={() => resetTilt(index)}
              >
                <div className="card-content">
                  {product.isHolographic && !isMobile && (
                    <div className="card-shine"></div>
                  )}
                  <img src={product.image} alt={product.name} />
                </div>
              </div>
              <div className="product-info">
                <h3>{product.name}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;
