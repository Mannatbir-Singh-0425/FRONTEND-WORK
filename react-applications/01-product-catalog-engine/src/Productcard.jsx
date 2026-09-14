import "./productcard.css";

function Productcard({ Name, desc, stock, price }) {
  const isAvailable = Number(stock) > 0;

  return (
    <div className="product-item-card">
      <div className="card-top-row">
        <span className={`stock-badge ${isAvailable ? "in-stock" : "out-stock"}`}>
          {isAvailable ? `In Stock (${stock})` : "Out of Stock"}
        </span>
        <span className="product-price">{price}</span>
      </div>

      <h3 className="product-title">{Name}</h3>
      <p className="product-desc">{desc}</p>

      <div className="card-actions">
        <button 
          className="btn-card primary" 
          disabled={!isAvailable}
          onClick={() => alert(`Added ${Name} to cart!`)}
        >
          Add to Cart
        </button>
        <button 
          className="btn-card outline" 
          disabled={!isAvailable}
          onClick={() => alert(`Proceeding to checkout for ${Name}`)}
        >
          Quick Buy
        </button>
      </div>
    </div>
  );
}

export default Productcard;