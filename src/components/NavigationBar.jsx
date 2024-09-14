import React from 'react';
import { Link } from 'react-router-dom';

const NavigationBar = ({ cartCount }) => {
  return (
    <nav className="navbar">
      <Link to="/">StreamList</Link>
      <Link to="/subscriptions">Subscriptions</Link>
      <Link to="/cart">Cart ({cartCount})</Link>
      <Link to="/about">About</Link>
    </nav>
  );
};

export default NavigationBar;
