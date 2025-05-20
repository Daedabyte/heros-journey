import React, { useState, useEffect, useRef } from "react";
import "./ProductsSection.css";
import { config } from "../../config";
import Airtable from "airtable";

// Configure Airtable
Airtable.configure({
  endpointUrl: config.airtable.endpointUrl,
  apiKey: config.airtable.apiKey,
});

const base = Airtable.base(config.airtable.baseId);
const table = base(config.airtable.cardTableId);

const CACHE_KEY = "productsCache";
const CACHE_EXPIRY = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

const ProductsSection = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [isMobile, setIsMobile] = useState(false);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isRetrying, setIsRetrying] = useState(false);
  const maxRetries = 3;

  const cardRefs = useRef([]);

  const getCache = () => {
    const cached = localStorage.getItem(CACHE_KEY);
    if (!cached) {
      return null;
    }

    const { data, timestamp } = JSON.parse(cached);
    const now = new Date().getTime();
    const age = now - timestamp;
    const expiresIn = CACHE_EXPIRY - age;

    if (now - timestamp > CACHE_EXPIRY) {
      localStorage.removeItem(CACHE_KEY);
      return null;
    }

    return data;
  };

  const setCache = (data) => {
    const cacheData = {
      data,
      timestamp: new Date().getTime(),
    };
    localStorage.setItem(CACHE_KEY, JSON.stringify(cacheData));
  };

  const fetchProducts = async (retryCount = 0) => {
    setLoading(true);

    try {
      // Check cache first
      const cachedProducts = getCache();
      if (cachedProducts) {
        setProducts(cachedProducts);
        setError(null);
        setIsRetrying(false);
        setLoading(false);
        return;
      }
      const records = await table
        .select({
          view: "Cards",
        })
        .all();

      const transformedProducts = records.map((record) => {
        const fields = record.fields;
        return {
          id: record.id,
          name: fields.name || "Unnamed Card",
          category: fields.tag?.[0]?.toLowerCase() || "other",
          image: fields.image?.[0]?.url || "/images/placeholder-card.jpg",
          isHolographic: Boolean(fields["is-holographic"]),
          description: fields["alt-text"] || "",
          active: Boolean(fields.active ?? true),
        };
      });

      const activeProducts = transformedProducts.filter(
        (product) => product.active
      );

      // Cache the products
      setCache(activeProducts);

      setProducts(activeProducts);
      setError(null);
      setIsRetrying(false);
    } catch (err) {
      if (retryCount < maxRetries) {
        setIsRetrying(true);
        setTimeout(() => {
          fetchProducts(retryCount + 1);
        }, 2000 * Math.pow(2, retryCount));
        return;
      }

      setError(`Failed to load products: ${err.message}`);
      setIsRetrying(false);

      setProducts([
        {
          id: 1,
          name: "Jace, the Mind Sculptor",
          category: "magic",
          image: "/images/sauron-card.webp",
          rarity: "Mythic Rare",
          isHolographic: true,
          description: "One of the most powerful planeswalkers ever printed.",
        },
        {
          id: 2,
          name: "Mega Gyarados",
          category: "pokemon",
          image: "/images/m-gyarados.png",
          rarity: "Ultra Rare",
          isHolographic: true,
          description: "Powerful water Pokémon evolution.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    cardRefs.current = cardRefs.current.slice(0, filterProducts().length);

    const checkMobile = () => {
      setIsMobile(window.matchMedia("(max-width: 768px)").matches);
    };

    checkMobile();

    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, [activeCategory, products]);

  const handleTilt = (e, index) => {
    if (isMobile) return;

    const card = cardRefs.current[index];
    if (!card) return;

    const product = filterProducts()[index];
    if (!product.isHolographic) {
      card.style.transform = "scale3d(1.07, 1.07, 1.07)";
      return;
    }

    const cardRect = card.getBoundingClientRect();
    const cardWidth = cardRect.width;
    const cardHeight = cardRect.height;

    const centerX = cardRect.left + cardWidth / 2;
    const centerY = cardRect.top + cardHeight / 2;
    const mouseX = e.clientX - centerX;
    const mouseY = e.clientY - centerY;

    const rotateY = (mouseX / (cardWidth / 2)) * 15;
    const rotateX = -(mouseY / (cardHeight / 2)) * 15;

    card.style.transform = `perspective(1000px) rotateY(${rotateY}deg) rotateX(${rotateX}deg) scale3d(1.10, 1.10, 1.10)`;

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

  const resetTilt = (index) => {
    if (isMobile) return;

    const card = cardRefs.current[index];
    if (!card) return;

    const product = filterProducts()[index];

    if (product && product.isHolographic) {
      card.style.transform =
        "perspective(1000px) rotateY(0deg) rotateX(0deg) scale3d(1, 1, 1)";

      const shine = card.querySelector(".card-shine");
      if (shine) {
        shine.style.opacity = "0";
      }
    } else {
      card.style.transform = "scale3d(1, 1, 1)";
    }
  };

  const filterProducts = () => {
    if (activeCategory === "all") {
      return products;
    }
    return products.filter((product) => product.category === activeCategory);
  };

  const setCategory = (category) => {
    setActiveCategory(category);
  };

  const getCategories = () => {
    const categories = ["all"];

    products.forEach((product) => {
      if (product.category && !categories.includes(product.category)) {
        categories.push(product.category);
      }
    });

    return categories;
  };

  return (
    <section id="products" className="products-section">
      <div className="section-container">
        <h2 className="section-title">What we got</h2>

        <div className="product-categories">
          {getCategories().map((category) => (
            <button
              key={category}
              className={`category-btn ${
                activeCategory === category ? "active" : ""
              }`}
              onClick={() => setCategory(category)}
            >
              {category === "all"
                ? "All"
                : category === "magic"
                ? "Magic: The Gathering"
                : category === "pokemon"
                ? "Pokemon"
                : category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="loading-container">
            <p>Loading awesome cards...</p>
          </div>
        ) : error ? (
          <div className="error-container">
            <p>{error}</p>
          </div>
        ) : (
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
                    <img
                      src={product.image}
                      alt={product.name}
                      onError={(e) => {
                        e.target.src = "/images/placeholder-card.jpg";
                      }}
                    />
                  </div>
                </div>
                <div className="product-info">
                  <h3>{product.name}</h3>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductsSection;
