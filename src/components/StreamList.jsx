import React, { useState } from 'react';
import Data from '../data/Data';  // Import the data

const StreamList = ({ cart, setCart, addToCart }) => {
  const [streamName, setStreamName] = useState('');
  const [streams, setStreams] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [error, setError] = useState('');

  // Handle stream submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmedStreamName = streamName.trim();

    // Error handling for empty input
    if (!trimmedStreamName) {
      setError('Stream name cannot be empty!');
      return;
    }

    // Check if the stream name exists in Data.jsx and add to cart
    const foundItem = Data.find(item => item.name.toLowerCase() === trimmedStreamName.toLowerCase());
    if (foundItem) {
      addOrUpdateCart(foundItem);  // Optimized add to cart function
    }

    // If editing, update the stream
    if (editIndex !== null) {
      const updatedStreams = [...streams];
      updatedStreams[editIndex] = { ...updatedStreams[editIndex], name: trimmedStreamName };
      setStreams(updatedStreams);
      setEditIndex(null); // Reset after editing
    } else {
      // Add new stream to list (not cart)
      setStreams([...streams, { name: trimmedStreamName, watched: false }]);
    }

    setStreamName(''); // Clear input
    setError(''); // Clear error
  };

  // Optimized function to add or update cart
  const addOrUpdateCart = (item) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find(cartItem => cartItem.id === item.id);
      if (existingItem) {
        // Update the quantity if the item is already in the cart
        return prevCart.map(cartItem =>
          cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
        );
      } else {
        // Add new item to the cart if it doesn't exist
        return [...prevCart, { ...item, quantity: 1 }];
      }
    });
  };

  // Handle edit button click
  const handleEdit = (index) => {
    setStreamName(streams[index].name);
    setEditIndex(index);
  };

  // Handle delete button click
  const handleDelete = (index) => {
    const updatedStreams = streams.filter((_, i) => i !== index);
    setStreams(updatedStreams);
  };

  // Handle watch button click
  const handleWatch = (index) => {
    const updatedStreams = [...streams];
    updatedStreams[index].watched = !updatedStreams[index].watched;
    setStreams(updatedStreams);
  };

  return (
    <div className="streamlist-container">
      <h2>Stream List</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={streamName}
          onChange={(e) => setStreamName(e.target.value)}
          placeholder="Enter stream name"
        />
        <button type="submit">{editIndex !== null ? 'Update Stream' : 'Add Stream'}</button>
      </form>

      {/* Error message */}
      {error && <p className="error-message">{error}</p>}

      <ul>
        {streams.map((stream, index) => (
          <li key={index}>
            <span style={{ textDecoration: stream.watched ? 'line-through' : 'none' }}>
              {stream.name}
            </span>
            <button onClick={() => handleWatch(index)}>
              {stream.watched ? 'Unwatch' : 'Watch'}
            </button>
            <button onClick={() => handleEdit(index)}>Edit</button>
            <button onClick={() => handleDelete(index)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StreamList;
