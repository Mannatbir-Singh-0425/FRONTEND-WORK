import { useState } from "react";
import Logo from "./assets/Logo.png";
import "./Navbar.css";

function Navbar({ cartCount, searchQuery, setSearchQuery, cartItems, onClearCart }) {
  const [showCartDrawer, setShowCartDrawer] = useState(false);

  const totalCartValue = cartItems.reduce((acc, item) => acc + item.price, 0);

  return (
    <>
      <nav className="navbar">
        <div className="nav-left">
          <img className="navlogo" src={Logo} alt="Nexus Market Logo" />
          <span className="brand-name">NexusMarket</span>
        </div>

        <div className="nav-center">
          <input
            placeholder="Search electronics, audio, gear..."
            id="searchbar"
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="nav-right">
          <button id="loginbtn" className="nav-btn" onClick={() => alert("Redirecting to NexusID Auth Portal...")}>
            Account
          </button>
          <button id="cartbtn" className="nav-btn cart-btn" onClick={() => setShowCartDrawer(!showCartDrawer)}>
            Cart
            <span className="cart-badge">{cartCount}</span>
          </button>
        </div>
      </nav>

      {/* Cart Drawer Modal */}
      {showCartDrawer && (
        <div className="cart-drawer-overlay" onClick={() => setShowCartDrawer(false)}>
          <div className="cart-drawer" onClick={(e) => e.stopPropagation()}>
            <div className="drawer-header">
              <h3>Your Shopping Cart ({cartCount})</h3>
              <button className="close-btn" onClick={() => setShowCartDrawer(false)}>✕</button>
            </div>

            <div className="drawer-body">
              {cartItems.length === 0 ? (
                <p className="empty-cart">Your cart is currently empty.</p>
              ) : (
                <div className="cart-list">
                  {cartItems.map((item, idx) => (
                    <div key={idx} className="cart-item-row">
                      <img src={item.image} alt={item.name} className="cart-thumb" />
                      <div className="cart-item-info">
                        <h4>{item.name}</h4>
                        <span className="cart-item-price">₹{item.price.toLocaleString()}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {cartItems.length > 0 && (
              <div className="drawer-footer">
                <div className="total-row">
                  <span>Total Amount:</span>
                  <span className="total-price">₹{totalCartValue.toLocaleString()}</span>
                </div>
                <div className="drawer-actions">
                  <button className="btn-checkout" onClick={() => alert("Proceeding to secure checkout payment gateway!")}>
                    Checkout Now
                  </button>
                  <button className="btn-clear" onClick={onClearCart}>
                    Clear Cart
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default Navbar;