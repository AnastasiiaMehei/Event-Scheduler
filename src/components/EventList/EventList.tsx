import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectFilteredEvents, changeEventsFilter, changeDateFilter, changeCategoryFilter } from "../../redux/filter/filter";
import Event from '../Event/Event';
import * as css from './EventList.module.css';

export default function EventList() {
  const events = useSelector(selectFilteredEvents);
  const dispatch = useDispatch();

  const handleNameChange = (e) => {
    dispatch(changeEventsFilter(e.target.value));
  };

  const handleDateChange = (e) => {
    dispatch(changeDateFilter(e.target.value));
  };

  const handleCategoryChange = (e) => {
    dispatch(changeCategoryFilter(e.target.value));
  };

  return (
    <div>
      <h2>Events</h2>
      <div className={css.filters}>
        <label>
          Name:
          <input type="text" onChange={handleNameChange} />
        </label>
        <label>
          Date:
          <input type="date" onChange={handleDateChange} />
        </label>
        <label>
          Category:
          <select onChange={handleCategoryChange}>
            <option value="">All</option>
            <option value="meeting">Meeting</option>
            <option value="birthday">Birthday</option>
            <option value="workshop">Workshop</option>
            <option value="conference">Conference</option>
            <option value="webinar">Webinar</option>
            <option value="party">Party</option>
          </select>
        </label>
      </div>
      <ul className={css.ul}>
        {events.map((event) => (
          <li className={css.li} key={event.id}>
            <Event id={event.id} event={event} />
          </li>
        ))}
      </ul>
    </div>
  );
}
