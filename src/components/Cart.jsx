import React, { useState, useEffect } from 'react';

// Example item data (you'll likely replace this with data from Data.js)
const exampleItems = [
  { id: 1, name: "Movie 1", price: 10 },
  { id: 2, name: "Movie 2", price: 15 },
  { id: 3, name: "Movie 3", price: 20 },
];

const Cart = () => {
  const [cart, setCart] = useState([]);
  
  // Load cart data from localStorage on page load
  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(savedCart);
  }, []);
  
  // Update localStorage whenever cart changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addItem = (item) => {
    const existingItem = cart.find(i => i.id === item.id);
    if (existingItem) {
      alert('Item already in the cart');
    } else {
      setCart([...cart, { ...item, quantity: 1 }]);
    }
  };

  const updateQuantity = (itemId, quantity) => {
    setCart(cart.map(item => 
      item.id === itemId ? { ...item, quantity } : item
    ));
  };

  const removeItem = (itemId) => {
    setCart(cart.filter(item => item.id !== itemId));
  };

  const totalPrice = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div>
      <h1>Your Cart</h1>
      <ul>
        {cart.map(item => (
          <li key={item.id}>
            {item.name} - ${item.price} x {item.quantity}
            <input 
              type="number" 
              value={item.quantity} 
              onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))} 
              min="1" 
            />
            <button onClick={() => removeItem(item.id)}>Remove</button>
          </li>
        ))}
      </ul>
      <h2>Total: ${totalPrice}</h2>
    </div>
  );
};

export default Cart;
