import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../redux/store';
import { deleteEvent } from '../../redux/events/slice';

export default function EventList() {
  const events = useSelector((state: RootState) => state.events.events);
  const dispatch = useDispatch();

  return (
    <div>
      <h2>Events</h2>
      <ul>
        {events.map(event => (
          <li key={event.id}>
            <p><strong>Date:</strong> {event.date}</p>
            <p><strong>Time:</strong> {event.time}</p>
            <p><strong>Category:</strong> {event.category}</p>
            <p><strong>Description:</strong> {event.description}</p>
            <button onClick={() => dispatch(deleteEvent(event.id))}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
