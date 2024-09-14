import React, { useState } from 'react';

const StreamList = () => {
  const [events, setEvents] = useState([]);
  const [newEvent, setNewEvent] = useState('');
  
  const addEvent = () => {
    if (newEvent) {
      setEvents([...events, { text: newEvent, watched: false }]);
      setNewEvent(''); // Clear input after adding
    }
  };

  const deleteEvent = (index) => {
    setEvents(events.filter((_, i) => i !== index));
  };

  const editEvent = (index, newText) => {
    const updatedEvents = events.map((event, i) =>
      i === index ? { ...event, text: newText } : event
    );
    setEvents(updatedEvents);
  };

  const toggleWatched = (index) => {
    const updatedEvents = events.map((event, i) =>
      i === index ? { ...event, watched: !event.watched } : event
    );
    setEvents(updatedEvents);
  };

  return (
    <div>
      <h1>StreamList</h1>
      <input
        type="text"
        value={newEvent}
        onChange={(e) => setNewEvent(e.target.value)}
        placeholder="Enter event"
      />
      <button onClick={addEvent}>Add Event</button>

      <ul>
        {events.map((event, index) => (
          <li key={index} style={{ textDecoration: event.watched ? 'line-through' : 'none' }}>
            {event.text}
            <button onClick={() => toggleWatched(index)}>
              {event.watched ? 'Unwatch' : 'Watch'}
            </button>
            <button onClick={() => deleteEvent(index)}>Delete</button>
            <button
              onClick={() => {
                const newText = prompt('Edit event:', event.text);
                if (newText) editEvent(index, newText);
              }}
            >
              Edit
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StreamList;
