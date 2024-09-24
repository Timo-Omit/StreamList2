import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import StreamList from "./components/StreamList";
import Movies from "./components/Movies";
import Cart from "./components/Cart";
import About from "./components/About";
import Subscription from "./components/Subscription";
import TMDBSearch from "./components/TMDBSearch";
import DarkModeToggle from "./components/DarkModeToggle";  
import './styles/App.css';

function App() {
  const [cart, setCart] = useState([]);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(savedCart);
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.body.className = !isDarkMode ? 'dark-mode' : 'light-mode';
  };

  const addToCart = (item) => {
    const existingItem = cart.find(cartItem => cartItem.id === item.id);
    if (!existingItem) {
      setCart([...cart, { ...item, quantity: 1 }]);
    }
  };

  const removeFromCart = (itemId) => {
    setCart(cart.filter(item => item.id !== itemId));
  };

  return (
    <Router>
      <DarkModeToggle isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />  

      <nav>
        <ul>
          <li><Link to="/">StreamList</Link></li>
          <li><Link to="/subscriptions">Subscriptions</Link></li>
          <li><Link to="/movies">Movies</Link></li>
          <li><Link to="/cart">Cart ({cart.length})</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/search">Movie Search</Link></li>
        </ul>
      </nav>

      <Routes>
        <Route path="/" element={<StreamList />} />
        <Route path="/subscriptions" element={<Subscription addToCart={addToCart} cartItems={cart} />} />
        <Route path="/movies" element={<Movies addToCart={addToCart} cartItems={cart} />} />
        <Route path="/cart" element={<Cart cart={cart} removeFromCart={removeFromCart} setCart={setCart} />} />
        <Route path="/about" element={<About />} />
        <Route path="/search" element={<TMDBSearch />} />
      </Routes>
    </Router>
  );
}

export default App;
