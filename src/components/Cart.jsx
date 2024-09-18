import React, { useState, useEffect } from 'react';

const Cart = ({ cart, setCart, removeFromCart }) => {

  const updateQuantity = (itemId, quantity) => {
    setCart(cart.map(item =>
      item.id === itemId ? { ...item, quantity: Math.max(quantity, 1) } : item
    ));
  };

  const totalPrice = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="cart-container">
      <h1>Your Cart</h1>
      <ul>
        {cart.map(item => (
          <li key={item.id}>
            {item.name} - ${item.price} x 
            <input 
              type="number" 
              value={item.quantity} 
              onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))} 
              min="1" 
            />
            <button onClick={() => removeFromCart(item.id)}>Remove</button>
          </li>
        ))}
      </ul>
      <h2>Total: ${totalPrice.toFixed(2)}</h2>
    </div>
  );
};

export default Cart;
