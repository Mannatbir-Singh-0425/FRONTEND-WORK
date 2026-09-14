import About from "./About.jsx";
import Productcard from "./Productcard.jsx";
import "./Home.css";

function Home() {
  const operandA = 10;
  const operandB = 20;

  const products = [
    {
      id: 1,
      Name: "iPhone 17 Pro",
      desc: "Flagship Mobile Phone with A19 Bionic",
      stock: 3,
      price: "$999"
    },
    {
      id: 2,
      Name: "Samsung Galaxy S25 Ultra",
      desc: "Titanium Frame Snapdragon 8 Gen 4",
      stock: 5,
      price: "$1199"
    },
    {
      id: 3,
      Name: "MacBook Pro 16",
      desc: "Apple M4 Max Workstation Laptop",
      stock: 2,
      price: "$2499"
    },
    {
      id: 4,
      Name: "AirPods Max Spatial",
      desc: "Lossless High-Fidelity Audio Headset",
      stock: 0,
      price: "$549"
    },
    {
      id: 5,
      Name: "iPad Pro OLED 13",
      desc: "Ultra Retina XDR Tandem Display",
      stock: 7,
      price: "$1299"
    },
    {
      id: 6,
      Name: "Sony Alpha A7R V",
      desc: "61MP Full-Frame Mirrorless Camera",
      stock: 4,
      price: "$3899"
    }
  ];

  function generateGreeting(user) {
    return `Welcome, ${user}!`;
  }

  const technologies = ["React 19", "Vite Bundler", "Modern JSX", "State Hooks"];
  const engineerRecord = { role: "Frontend Engineer", clearance: "Level 2" };

  return (
    <div className="home-dashboard">
      <header className="dashboard-hero">
        <span className="hero-tag">React Engineering Lab 01</span>
        <h1>Product Catalog Engine</h1>
        <p className="hero-subtext">
          Demonstrating JSX data interpolation, dynamic props mapping, conditional stock rendering, and array transformations.
        </p>

        <div class="metrics-pill-bar">
          <span className="metric-pill">Active Session: {generateGreeting(engineerRecord.role)}</span>
          <span className="metric-pill">Math Expression Evaluation (A + B): {operandA + operandB}</span>
        </div>
      </header>

      {/* Tech Stack List Mapping */}
      <section className="tech-section">
        <h3>Mapped Architecture Stack</h3>
        <div className="tech-chips">
          {technologies.map((tech, index) => (
            <span key={index} className="tech-chip">
              {tech}
            </span>
          ))}
        </div>
      </section>

      <About />

      {/* Product Grid Showcase */}
      <section className="catalog-section">
        <div className="section-title-row">
          <h2>Live Inventory Showcase</h2>
          <span className="inventory-count">{products.length} Items Listed</span>
        </div>

        <div className="product-catalog-grid">
          {products.map((item) => (
            <Productcard key={item.id} {...item} />
          ))}
        </div>
      </section>
    </div>
  );
}

export default Home;
