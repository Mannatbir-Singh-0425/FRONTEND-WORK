import { useEffect, useMemo, useState } from "react";
import { BrowserRouter, Link, NavLink, Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  clearCart,
  decreaseQuantity,
  increaseQuantity,
  removeFromCart,
} from "./features/cart/cartSlice.js";
import { formatPrice, products } from "./data/products.js";
import "./App.css";

const STORAGE_KEY = "little-market-cart";

function Layout({ children, cartCount, toast }) {
  return (
    <div className="site-shell">
      <div className="announcement">A little something for your everyday · Free shipping over ₹2,500</div>
      <header className="site-header">
        <Link className="brand" to="/" aria-label="Little Market home">
          <span className="brand-mark">lm.</span>
          <span>little market</span>
        </Link>
        <nav className="main-nav" aria-label="Main navigation">
          <NavLink to="/" end>Home</NavLink>
          <NavLink to="/products">Shop</NavLink>
          <NavLink to="/about">Our story</NavLink>
        </nav>
        <NavLink className="cart-link" to="/cart" aria-label={`Cart, ${cartCount} items`}>
          <span className="cart-icon" aria-hidden="true">▱</span>
          <span>Cart</span>
          <span className="cart-count">{cartCount}</span>
        </NavLink>
      </header>
      {toast && <div className="toast" role="status">{toast}</div>}
      <main>{children}</main>
      <footer className="site-footer">
        <Link className="footer-brand" to="/">little market</Link>
        <span>Good things, made simple.</span>
        <span>© {new Date().getFullYear()} Little Market</span>
      </footer>
    </div>
  );
}

function HomePage({ onAdd }) {
  return (
    <>
      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow">A SMALL SHOP FOR EVERYDAY JOY</p>
          <h1>Good things.<br /><em>Good days.</em></h1>
          <p className="hero-description">
            Thoughtful finds for the little moments that make a day feel like yours.
            Meet your new everyday favorites.
          </p>
          <div className="hero-actions">
            <Link className="button button-dark" to="/products">Explore the shop <span aria-hidden="true">↗</span></Link>
            <Link className="text-link" to="/about">Get to know us</Link>
          </div>
          <div className="hero-note"><span className="note-star">✳</span> Carefully picked, made to be loved.</div>
        </div>
        <div className="hero-image-wrap">
          <img
            className="hero-image"
            src="https://images.unsplash.com/photo-1490312278390-ab64016e0aa9?auto=format&fit=crop&w=1200&q=90"
            alt="A sunlit, considered home with warm natural textures"
          />
          <div className="image-caption"><span>THE LITTLE THINGS</span><span>make a home</span></div>
          <span className="hero-stamp" aria-hidden="true">GOOD<br />THINGS<br />INSIDE</span>
        </div>
      </section>
      <section className="home-feature">
        <div>
          <p className="eyebrow">THE GOOD STUFF</p>
          <h2>A few of our favorites</h2>
        </div>
        <Link className="text-link" to="/products">Shop all products <span aria-hidden="true">→</span></Link>
      </section>
      <ProductGrid items={products.slice(0, 4)} onAdd={onAdd} featured />
      <section className="values-strip">
        <div><span>01</span><strong>Thoughtfully chosen</strong><p>Useful, lovely things with a little something extra.</p></div>
        <div><span>02</span><strong>Made for real life</strong><p>Everyday pieces you'll reach for again and again.</p></div>
        <div><span>03</span><strong>A lighter footprint</strong><p>Less fuss, better materials, more keep-forever finds.</p></div>
      </section>
    </>
  );
}

function ProductCard({ product, onAdd }) {
  return (
    <article className="product-card">
      <div className="product-image-wrap">
        <img src={product.image} alt={product.name} loading="lazy" />
        {product.badge && <span className="product-badge">{product.badge}</span>}
        <button className="quick-add" type="button" onClick={() => onAdd(product)}>
          <span aria-hidden="true">+</span> Add to cart
        </button>
      </div>
      <div className="product-info">
        <div><p className="product-category">{product.category}</p><h3>{product.name}</h3></div>
        <span className="product-price">{formatPrice(product.price)}</span>
      </div>
      <p className="product-description">{product.description}</p>
    </article>
  );
}

function ProductGrid({ items, onAdd, featured = false }) {
  return (
    <div className={`product-grid${featured ? " featured-grid" : ""}`}>
      {items.map((product) => <ProductCard key={product.id} product={product} onAdd={onAdd} />)}
    </div>
  );
}

function ProductsPage({ onAdd }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const categories = ["All", ...new Set(products.map((product) => product.category))];
  const filteredProducts = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return products.filter((product) => {
      const matchesCategory = category === "All" || product.category === category;
      const matchesSearch =
        !normalizedQuery ||
        `${product.name} ${product.category} ${product.description}`.toLowerCase().includes(normalizedQuery);
      return matchesCategory && matchesSearch;
    });
  }, [category, query]);

  return (
    <section className="page-section">
      <div className="page-heading">
        <div><p className="eyebrow">THE LITTLE MARKET COLLECTION</p><h1>Find your new <em>favorite.</em></h1></div>
        <p>Good design, useful details, and pieces that feel right at home.</p>
      </div>
      <div className="shop-controls">
        <label className="search-field">
          <span className="sr-only">Search products</span>
          <span aria-hidden="true">⌕</span>
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search the shop..." />
        </label>
        <div className="category-filters" aria-label="Filter by category">
          {categories.map((item) => (
            <button
              key={item}
              className={`filter-chip${category === item ? " selected" : ""}`}
              type="button"
              onClick={() => setCategory(item)}
              aria-pressed={category === item}
            >
              {item}
            </button>
          ))}
        </div>
      </div>
      <p className="results-count">{filteredProducts.length} lovely {filteredProducts.length === 1 ? "find" : "finds"}</p>
      {filteredProducts.length ? (
        <ProductGrid items={filteredProducts} onAdd={onAdd} />
      ) : (
        <div className="empty-results"><span>⌕</span><h2>No finds just yet</h2><p>Try a different search or browse another category.</p></div>
      )}
    </section>
  );
}

function CartPage({ cart, totalPrice, onIncrease, onDecrease, onRemove, onClear }) {
  const navigate = useNavigate();
  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <section className="page-section cart-page">
      <div className="page-heading">
        <div><p className="eyebrow">YOUR LITTLE FINDS</p><h1>Your <em>cart.</em></h1></div>
        <Link className="text-link" to="/products">← Keep browsing</Link>
      </div>
      {cart.length === 0 ? (
        <div className="empty-cart">
          <span className="empty-bag" aria-hidden="true">♡</span>
          <h2>Your cart is taking a little break.</h2>
          <p>There are plenty of lovely things waiting to come home with you.</p>
          <Link className="button button-dark" to="/products">Find something lovely <span aria-hidden="true">↗</span></Link>
        </div>
      ) : (
        <div className="cart-layout">
          <div className="cart-items">
            <div className="cart-items-heading"><span>{itemCount} {itemCount === 1 ? "item" : "items"}</span><button className="subtle-button" type="button" onClick={onClear}>Clear cart</button></div>
            {cart.map((item) => (
              <article className="cart-item" key={item.id}>
                <img src={item.image} alt={item.name} />
                <div className="cart-item-details">
                  <p className="product-category">{item.category}</p>
                  <h2>{item.name}</h2>
                  <p className="cart-unit-price">{formatPrice(item.price)} each</p>
                  <div className="quantity-control" aria-label={`Quantity for ${item.name}`}>
                    <button type="button" onClick={() => onDecrease(item.id)} aria-label={`Decrease ${item.name} quantity`}>−</button>
                    <span>{item.quantity}</span>
                    <button type="button" onClick={() => onIncrease(item.id)} aria-label={`Increase ${item.name} quantity`}>+</button>
                  </div>
                </div>
                <div className="cart-item-end">
                  <strong>{formatPrice(item.price * item.quantity)}</strong>
                  <button className="remove-button" type="button" onClick={() => onRemove(item.id)}>Remove</button>
                </div>
              </article>
            ))}
          </div>
          <aside className="order-summary">
            <p className="eyebrow">A LITTLE RECAP</p>
            <h2>Order summary</h2>
            <div className="summary-row"><span>Subtotal</span><span>{formatPrice(totalPrice)}</span></div>
            <div className="summary-row"><span>Shipping</span><span className="shipping-note">{totalPrice >= 2500 ? "On us" : "Calculated at checkout"}</span></div>
            <div className="summary-total"><span>Total</span><strong>{formatPrice(totalPrice)}</strong></div>
            <button className="button button-dark checkout-button" type="button" onClick={() => navigate("/checkout")}>Continue to checkout <span aria-hidden="true">→</span></button>
            <p className="secure-note">✳ A little care goes into every order.</p>
          </aside>
        </div>
      )}
    </section>
  );
}

function AboutPage() {
  return (
    <section className="about-page">
      <div className="about-copy">
        <p className="eyebrow">A NOTE FROM US</p>
        <h1>We believe in the magic of <em>everyday.</em></h1>
        <p>Little Market started with a simple thought: the things we use every day should make us feel good. Not just look good — feel useful, thoughtful, and a little bit special, too.</p>
        <p>So we bring together practical pieces, considered materials, and small details worth noticing. Nothing complicated. Just lovely finds made for real life.</p>
        <Link className="button button-dark" to="/">Back to home <span aria-hidden="true">↗</span></Link>
      </div>
      <div className="about-image-wrap">
        <img src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1100&q=90" alt="Warm, relaxed living space with thoughtfully chosen home pieces" />
        <span>Make room for the good stuff.</span>
      </div>
      <div className="about-signoff"><span>✳</span> Thoughtfully found. Happily kept.</div>
    </section>
  );
}

function CheckoutPage({ cart, totalPrice, onOrderPlaced }) {
  const navigate = useNavigate();

  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    onOrderPlaced({
      name: formData.get("name"),
      itemCount: cart.reduce((sum, item) => sum + item.quantity, 0),
      totalPrice,
    });
    navigate("/order-confirmation");
  }

  if (!cart.length) {
    return (
      <section className="page-section empty-cart">
        <h1>Nothing to check out <em>just yet.</em></h1>
        <p>Add a few favorites to your cart and they'll be right here.</p>
        <Link className="button button-dark" to="/products">Explore the shop</Link>
      </section>
    );
  }

  return (
    <section className="page-section checkout-page">
      <div className="page-heading"><div><p className="eyebrow">ALMOST YOURS</p><h1>Checkout <em>with ease.</em></h1></div></div>
      <div className="checkout-layout">
        <form className="checkout-form" onSubmit={handleSubmit}>
          <h2>Your details</h2>
          <label>Full name<input name="name" type="text" autoComplete="name" placeholder="Your name" required /></label>
          <label>Email address<input name="email" type="email" autoComplete="email" placeholder="you@example.com" required /></label>
          <button className="button button-dark checkout-button" type="submit">Place your order <span aria-hidden="true">→</span></button>
          <p className="secure-note">This demo checkout doesn't process payments.</p>
        </form>
        <aside className="order-summary">
          <p className="eyebrow">JUST FOR YOU</p>
          <h2>Your order</h2>
          {cart.map((item) => (
            <div className="checkout-line" key={item.id}>
              <span>{item.name} <span className="checkout-quantity">× {item.quantity}</span></span>
              <strong>{formatPrice(item.price * item.quantity)}</strong>
            </div>
          ))}
          <div className="summary-total"><span>Total</span><strong>{formatPrice(totalPrice)}</strong></div>
        </aside>
      </div>
    </section>
  );
}

function OrderConfirmationPage({ order }) {
  return (
    <section className="page-section confirmation-page">
      <span className="confirmation-mark">✓</span>
      <p className="eyebrow">THANK YOU, {order?.name?.toUpperCase() || "FRIEND"}</p>
      <h1>Your good things are <em>on their way.</em></h1>
      <p>
        Your demo order{order?.itemCount ? ` of ${order.itemCount} ${order.itemCount === 1 ? "item" : "items"}` : ""} is all wrapped up.
        {order?.totalPrice ? ` Order total: ${formatPrice(order.totalPrice)}.` : ""}
      </p>
      <Link className="button button-dark" to="/products">Back to the shop <span aria-hidden="true">↗</span></Link>
    </section>
  );
}

function NotFoundPage() {
  return (
    <section className="page-section not-found">
      <p className="eyebrow">A LITTLE DETOUR</p>
      <h1>Well, this is <em>awkward.</em></h1>
      <p>We can't find the page you were looking for.</p>
      <Link className="button button-dark" to="/">Take me home <span aria-hidden="true">↗</span></Link>
    </section>
  );
}

function AppContent() {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const [toast, setToast] = useState("");
  const [order, setOrder] = useState(null);
  const location = useLocation();
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
    } catch (error) {
      console.error("Could not save the cart to localStorage.", error);
    }
  }, [cart]);

  useEffect(() => {
    if (!toast) return undefined;
    const timeoutId = window.setTimeout(() => setToast(""), 2600);
    return () => window.clearTimeout(timeoutId);
  }, [toast]);

  useEffect(() => {
    setToast("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location.pathname]);

  function handleAdd(product) {
    dispatch(addToCart(product));
    setToast(`${product.name} added to your cart`);
  }

  function handleOrderPlaced(orderDetails) {
    setOrder(orderDetails);
    dispatch(clearCart());
  }

  return (
    <Layout cartCount={cartCount} toast={toast}>
      <Routes>
        <Route path="/" element={<HomePage onAdd={handleAdd} />} />
        <Route path="/products" element={<ProductsPage onAdd={handleAdd} />} />
        <Route path="/cart" element={
          <CartPage
            cart={cart}
            totalPrice={totalPrice}
            onIncrease={(id) => dispatch(increaseQuantity(id))}
            onDecrease={(id) => dispatch(decreaseQuantity(id))}
            onRemove={(id) => dispatch(removeFromCart(id))}
            onClear={() => dispatch(clearCart())}
          />
        } />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/checkout" element={<CheckoutPage cart={cart} totalPrice={totalPrice} onOrderPlaced={handleOrderPlaced} />} />
        <Route path="/order-confirmation" element={<OrderConfirmationPage order={order} />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Layout>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}
