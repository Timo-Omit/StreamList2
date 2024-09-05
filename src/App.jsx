import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import StreamList from "./components/StreamList";
import Movies from "./components/Movies";
import Cart from "./components/Cart";
import About from "./components/About";
import './styles/App.css';

function App() {
  return (
    <Router>
      <nav>
        <ul>
          <li><Link to="/">StreamList</Link></li>
          <li><Link to="/movies">Movies</Link></li>
          <li><Link to="/cart">Cart</Link></li>
          <li><Link to="/about">About</Link></li>
        </ul>
      </nav>

      <Routes>
        <Route path="/" element={<StreamList />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Router>
  );
}

export default App;
