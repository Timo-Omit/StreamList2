import React from 'react';
import Data from '../data/Data';

const Movies = ({ addToCart, cartItems }) => {
  // Check if a movie is already in the cart
  const isInCart = (id) => cartItems.some((item) => item.id === id);

  return (
    <div className="subscription-container">
      <h2>Movies</h2>
      {Data.filter(item => item.id > 3) // Filtering only movie items (IDs > 3 in this case)
        .map((item) => (
          <div key={item.id} className="subscription-item">
            <span>{item.name}</span>
            <span>${item.price.toFixed(2)}</span>
            <button
              onClick={() => addToCart(item)}
              disabled={isInCart(item.id)} // Disable if the movie is already in the cart
            >
              {isInCart(item.id) ? 'Added to Cart' : 'Add to Cart'}
            </button>
          </div>
        ))}
    </div>
  );
};

export default Movies;
