import "./ShoppingCard.css";

const products = [
  {
    id: 1,
    category: "audio",
    name: "boAt Rockerz 450 Bluetooth Headphone",
    image: "https://i.pinimg.com/originals/06/d2/d7/06d2d746e5fdb898ebc454d245e83fa1.jpg",
    price: 1299,
    rating: "4.4 ★",
    tag: "Best Seller"
  },
  {
    id: 2,
    category: "wearables",
    name: "Noise ColorFit Pro 4 Smartwatch",
    image: "https://cdn1.smartprix.com/rx-iYKXux9GE-w280-h280/noise-colorfit-pro-4.webp",
    price: 2499,
    rating: "4.2 ★",
    tag: "Popular"
  },
  {
    id: 3,
    category: "smartphones",
    name: "Samsung Galaxy M14 5G (Berry Blue, 128GB)",
    image: "https://media-ik.croma.com/prod/https://media.tatacroma.com/Croma%20Assets/Communication/Mobiles/Images/305186_jo8oau.png",
    price: 10999,
    rating: "4.5 ★",
    tag: "5G Ready"
  },
  {
    id: 4,
    category: "laptops",
    name: "Lenovo IdeaPad Slim 3 Intel Core i5 Laptop",
    image: "https://media-ik.croma.com/Croma%20Assets/Computers%20Peripherals/Laptop/Images/312504_3_6bs16qKFk.png",
    price: 42990,
    rating: "4.6 ★",
    tag: "High Performance"
  },
  {
    id: 5,
    category: "footwear",
    name: "Nike Revolution 6 Running Shoes For Men",
    image: "https://rukminim1.flixcart.com/image/1500/1500/xif0q/shoe/0/m/f/8-dc3728-401nike-9-nike-midnight-navy-white-obsidian-ashen-slate-original-imaghyyggtfhwqzy.jpeg?q=90",
    price: 2695,
    rating: "4.3 ★",
    tag: "Trending"
  },
  {
    id: 6,
    category: "audio",
    name: "boAt Airdopes 141 TWS Earbuds",
    image: "https://www.myg.in/images/thumbnails/300/300/detailed/93/Airdopes_141_ANC-1-removebg-preview.png.png",
    price: 899,
    rating: "4.1 ★",
    tag: "Value Pick"
  },
];

function ProductCard({ product, onAddToCart }) {
  return (
    <div className="product-card">
      <div className="card-badge-row">
        <span className="card-tag">{product.tag}</span>
        <span className="card-rating">{product.rating}</span>
      </div>

      <div className="image-wrapper">
        <img src={product.image} alt={product.name} className="card-image" loading="lazy" />
      </div>

      <div className="card-content">
        <h3 className="card-title">{product.name}</h3>
        <div className="card-price-row">
          <span className="current-price">₹{product.price.toLocaleString()}</span>
          <span className="free-shipping">Free Delivery</span>
        </div>
      </div>

      <div className="card-button-group">
        <button className="btn-add-cart" onClick={() => onAddToCart(product)}>
          Add to Cart
        </button>
        <button className="btn-buy-now" onClick={() => {
          onAddToCart(product);
          alert(`Proceeding to checkout for ${product.name}`);
        }}>
          Buy Now
        </button>
      </div>
    </div>
  );
}

function ShoppingCard({ onAddToCart, searchQuery, selectedCategory, setSelectedCategory }) {
  const categories = [
    { id: "all", label: "All Items" },
    { id: "audio", label: "Audio & Sound" },
    { id: "smartphones", label: "Smartphones" },
    { id: "laptops", label: "Computers" },
    { id: "wearables", label: "Wearables" },
    { id: "footwear", label: "Footwear" }
  ];

  const filteredProducts = products.filter((p) => {
    const matchesCat = selectedCategory === "all" || p.category === selectedCategory;
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="shopping-section">
      <div className="category-toolbar">
        {categories.map((cat) => (
          <button
            key={cat.id}
            className={`cat-pill ${selectedCategory === cat.id ? "active" : ""}`}
            onClick={() => setSelectedCategory(cat.id)}
          >
            {cat.label}
          </button>
        ))}
      </div>

      <div className="results-header">
        <h2>Curated Electronics & Gear</h2>
        <span className="results-count">{filteredProducts.length} items found</span>
      </div>

      {filteredProducts.length === 0 ? (
        <div className="no-results">
          <p>No products match "{searchQuery}". Try a different search query.</p>
        </div>
      ) : (
        <div className="product-grid">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} onAddToCart={onAddToCart} />
          ))}
        </div>
      )}
    </div>
  );
}

export default ShoppingCard;
