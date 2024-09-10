// src/components/StreamList.js

import React, { useState } from 'react';

const StreamList = () => {
  const [inputValue, setInputValue] = useState('');
  const [submittedValue, setSubmittedValue] = useState(null);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim() === '') {
      alert('Please enter an event.');
      return;
    }
    setSubmittedValue(inputValue);  // Display the submitted input
    setInputValue('');  // Clear the input field after submission
  };

  return (
    <div className="streamlist-container">
      <h1>StreamList</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter an event..."
          value={inputValue}
          onChange={handleInputChange}
        />
        <button type="submit">Submit</button>
      </form>
      {submittedValue && (
        <div className="submitted-output">
          <h2>Your Event:</h2>
          <p>{submittedValue}</p>
        </div>
      )}
    </div>
  );
};

export default StreamList;
