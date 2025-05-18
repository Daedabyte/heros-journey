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
    // Adjust these values to control the tilt intensity
    const rotateY = (mouseX / (cardWidth / 2)) * 15; // Max 15 degrees rotation
    const rotateX = -(mouseY / (cardHeight / 2)) * 15;

    // Apply the rotation transform
    card.style.transform = `perspective(1000px) rotateY(${rotateY}deg) rotateX(${rotateX}deg) scale3d(1.10, 1.10, 1.10)`;

    // Update the shine effect position
    const shine = card.querySelector(".card-shine");
    if (shine) {
      shine.style.background = `radial-gradient(circle at ${
        50 + (mouseX / cardWidth) * 30
      }% ${
        50 + (mouseY / cardHeight) * 30
      }%, rgba(255, 255, 255, 0.4) 0%, rgba(255, 255, 255, 0) 60%)`;
      shine.style.opacity = "1";
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
      name: "Jace, the Mind Sculptor",
      category: "magic",
      image: "/images/sauron-card.webp",
      rarity: "Mythic Rare",
      price: "$89.99",
      isHolographic: true,
      description:
        "One of the most powerful planeswalkers ever printed, Jace offers incredible versatility and control.",
    },
    {
      id: 2,
      name: "Jace, the Mind Sculptor",
      category: "pokemon",
      image: "/images/m-gyarados.png",
      rarity: "Mythic Rare",
      price: "$89.99",
      isHolographic: true,
      description:
        "One of the most powerful planeswalkers ever printed, Jace offers incredible versatility and control.",
    },
    {
      id: 3,
      name: "Jace, the Mind Sculptor",
      category: "magic",
      image: "/images/magic-card-2.jpg",
      rarity: "Mythic Rare",
      price: "$89.99",
      isHolographic: false,
      description:
        "One of the most powerful planeswalkers ever printed, Jace offers incredible versatility and control.",
    },
    {
      id: 4,
      name: "Jace, the Mind Sculptor",
      category: "magic",
      image: "/images/espeon-ex.jpg",
      rarity: "Mythic Rare",
      price: "$89.99",
      isHolographic: true,
      description:
        "One of the most powerful planeswalkers ever printed, Jace offers incredible versatility and control.",
    },
    {
      id: 5,
      name: "Jace, the Mind Sculptor",
      category: "magic",
      image: "/images/sauron-card.webp",
      rarity: "Mythic Rare",
      price: "$89.99",
      description:
        "One of the most powerful planeswalkers ever printed, Jace offers incredible versatility and control.",
    },
    {
      id: 6,
      name: "Jace, the Mind Sculptor",
      category: "magic",
      image: "/images/sauron-card.webp",
      rarity: "Mythic Rare",
      price: "$89.99",
      description:
        "One of the most powerful planeswalkers ever printed, Jace offers incredible versatility and control.",
    },
    {
      id: 7,
      name: "Jace, the Mind Sculptor",
      category: "magic",
      image: "/images/sauron-card.webp",
      rarity: "Mythic Rare",
      price: "$89.99",
      description:
        "One of the most powerful planeswalkers ever printed, Jace offers incredible versatility and control.",
    },
    {
      id: 8,
      name: "Jace, the Mind Sculptor",
      category: "magic",
      image: "/images/sauron-card.webp",
      rarity: "Mythic Rare",
      price: "$89.99",
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
        <h2 className="section-title">What we got</h2>
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
                <p className="product-rarity">{product.rarity}</p>
                <p className="product-price">{product.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;
