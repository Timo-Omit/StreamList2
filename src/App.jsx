import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import StreamList from "./components/StreamList";
import Movies from "./components/Movies";
import Cart from "./components/Cart";
import About from "./components/About";
import Subscription from "./components/Subscription"; // Import Subscription
import './styles/App.css';

function App() {
  const [cart, setCart] = useState([]);

  // Load cart data from localStorage on page load
  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(savedCart);
  }, []);

  // Save cart data to localStorage when cart changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  // Add item to cart
  const addToCart = (item) => {
    const existingItem = cart.find(cartItem => cartItem.id === item.id);
    if (!existingItem) {
      setCart([...cart, { ...item, quantity: 1 }]);
    }
  };

  // Remove item from cart
  const removeFromCart = (itemId) => {
    setCart(cart.filter(item => item.id !== itemId));
  };

  return (
    <Router>
      <nav>
        <ul>
          <li><Link to="/">StreamList</Link></li>
          <li><Link to="/subscriptions">Subscriptions</Link></li>
          <li><Link to="/movies">Movies</Link></li>
          <li><Link to="/cart">Cart ({cart.length})</Link></li>
          <li><Link to="/about">About</Link></li>
        </ul>
      </nav>

      <Routes>
        <Route path="/" element={<StreamList />} />
        <Route path="/subscriptions" element={<Subscription addToCart={addToCart} cartItems={cart} />} />
        <Route path="/movies" element={<Movies addToCart={addToCart} cartItems={cart} />} />
        <Route path="/cart" element={<Cart cart={cart} removeFromCart={removeFromCart} setCart={setCart} />} />
        <Route path="/about" element={<About />} />
        <Route path="/" element={<StreamList cart={cart} setCart={setCart} addToCart={addToCart} />} />

      </Routes>
    </Router>
  );
}

export default App;
