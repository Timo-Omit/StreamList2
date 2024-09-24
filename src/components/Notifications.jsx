import React, { useState, useEffect } from 'react';

const Notifications = ({ message }) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (message) {
      setShow(true);
      setTimeout(() => setShow(false), 3000);
    }
  }, [message]);

  return (
    show && (
      <div className="notification">
        {message}
      </div>
    )
  );
};

export default Notifications;
