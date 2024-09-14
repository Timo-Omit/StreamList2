import React from 'react';
import Data from '../data/Data';

const Subscription = ({ addToCart, cartItems }) => {
  const isInCart = (id) => cartItems.some((item) => item.id === id);

  return (
    <div className="subscription-container">
      <h2>Subscriptions</h2>
      {Data.map((item) => (
        <div key={item.id} className="subscription-item">
          <span>{item.name}</span>
          <span>${item.price}</span>
          <button
            onClick={() => addToCart(item)}
            disabled={isInCart(item.id)}
          >
            {isInCart(item.id) ? 'Added to Cart' : 'Add to Cart'}
          </button>
        </div>
      ))}
    </div>
  );
};

export default Subscription;
