import React, { useState } from "react";
import "./ProductsSection.css";

const ProductsSection = () => {
  const [activeCategory, setActiveCategory] = useState("all");

  const products = [
    {
      id: 1,
      name: "Jace, the Mind Sculptor",
      category: "magic",
      image: "sauron-card.webp",
      rarity: "Mythic Rare",
      price: "$89.99",
      description:
        "One of the most powerful planeswalkers ever printed, Jace offers incredible versatility and control.",
    },
    {
      id: 2,
      name: "Charizard",
      category: "pokemon",
      image: "m-gyarados.png",
      rarity: "Holo Rare",
      price: "$149.99",
      description:
        "The iconic fire Pokemon that has been a fan favorite since the beginning of the franchise.",
    },
    {
      id: 3,
      name: "Liliana of the Veil",
      category: "magic",
      image: "magic-card-2.jpg",
      rarity: "Mythic Rare",
      price: "$79.99",
      description:
        "A powerful black planeswalker that excels at controlling the board through sacrifice effects.",
    },
    {
      id: 4,
      name: "Pikachu V",
      category: "pokemon",
      image: "espeon-ex.jpg",
      rarity: "Ultra Rare",
      price: "$19.99",
      description:
        "The fan-favorite electric mouse Pokemon in its powerful V form.",
    },
    // Duplicating items for multiple grids
    {
      id: 5,
      name: "Jace, the Mind Sculptor",
      category: "magic",
      image: "sauron-card.webp",
      rarity: "Mythic Rare",
      price: "$89.99",
      description:
        "One of the most powerful planeswalkers ever printed, Jace offers incredible versatility and control.",
    },
    {
      id: 6,
      name: "Charizard",
      category: "pokemon",
      image: "m-gyarados.png",
      rarity: "Holo Rare",
      price: "$149.99",
      description:
        "The iconic fire Pokemon that has been a fan favorite since the beginning of the franchise.",
    },
    {
      id: 7,
      name: "Liliana of the Veil",
      category: "magic",
      image: "magic-card-2.jpg",
      rarity: "Mythic Rare",
      price: "$79.99",
      description:
        "A powerful black planeswalker that excels at controlling the board through sacrifice effects.",
    },
    {
      id: 8,
      name: "Pikachu V",
      category: "pokemon",
      image: "espeon-ex.jpg",
      rarity: "Ultra Rare",
      price: "$19.99",
      description:
        "The fan-favorite electric mouse Pokemon in its powerful V form.",
    },
    // Duplicating again for third grid
    {
      id: 9,
      name: "Jace, the Mind Sculptor",
      category: "magic",
      image: "sauron-card.webp",
      rarity: "Mythic Rare",
      price: "$89.99",
      description:
        "One of the most powerful planeswalkers ever printed, Jace offers incredible versatility and control.",
    },
    {
      id: 10,
      name: "Charizard",
      category: "pokemon",
      image: "m-gyarados.png",
      rarity: "Holo Rare",
      price: "$149.99",
      description:
        "The iconic fire Pokemon that has been a fan favorite since the beginning of the franchise.",
    },
    {
      id: 11,
      name: "Liliana of the Veil",
      category: "magic",
      image: "magic-card-2.jpg",
      rarity: "Mythic Rare",
      price: "$79.99",
      description:
        "A powerful black planeswalker that excels at controlling the board through sacrifice effects.",
    },
    {
      id: 12,
      name: "Pikachu V",
      category: "pokemon",
      image: "espeon-ex.jpg",
      rarity: "Ultra Rare",
      price: "$19.99",
      description:
        "The fan-favorite electric mouse Pokemon in its powerful V form.",
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
          {filterProducts().map((product) => (
            <div
              key={product.id}
              className="product-card"
              data-category={product.category}
            >
              <div className="card-inner">
                <div className="card-front">
                  <img src={product.image} alt={product.name} />
                </div>
                <div className="card-back">
                  <h3>{product.name}</h3>
                  <p className="product-rarity">{product.rarity}</p>
                  <p className="product-price">{product.price}</p>
                  <p className="product-description">{product.description}</p>
                  <button className="product-btn">View Details</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;
