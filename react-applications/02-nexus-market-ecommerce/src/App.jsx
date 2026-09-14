import { useState } from "react";
import Navbar from "./Navbar.jsx";
import ShoppingCard from "./ShoppingCard.jsx";
import "./App.css";

function App() {
  const [cartItems, setCartItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const handleAddToCart = (product) => {
    setCartItems((prev) => [...prev, product]);
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  return (
    <div className="nexus-ecommerce-app">
      <Navbar 
        cartCount={cartItems.length} 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        cartItems={cartItems}
        onClearCart={handleClearCart}
      />
      <main className="main-viewport">
        <ShoppingCard 
          onAddToCart={handleAddToCart}
          searchQuery={searchQuery}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
      </main>
    </div>
  );
}

export default App;
