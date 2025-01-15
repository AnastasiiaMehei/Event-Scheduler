// EventList.tsx

import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { TiArrowBackOutline } from "react-icons/ti";
import { MdEventBusy, MdEventAvailable } from "react-icons/md";

import { Link } from "react-router-dom";
import {
  fetchEvents,
  createEvent,
  updateEvent,
  deleteEvent,
} from "../../redux/events/operations";
import {
  selectFilteredEvents,
  changeEventsFilter,
  changeDateFilter,
  changeCategoryFilter,
} from "../../redux/filter/filter";
import Event from "../Event/Event";
import css from "../EventList/EventList.module.css";
import { RootState } from "../../redux/store";

interface NewEvent {
  name: string;
  date: string;
  time: string;
  category: string;
  description: string;
}

export default function EventList() {
  const events = useSelector((state: RootState) => selectFilteredEvents(state));
  const dispatch = useDispatch();
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newEvent, setNewEvent] = useState<NewEvent>({
    name: "",
    date: "",
    time: "",
    category: "",
    description: "",
  });

  useEffect(() => {
    dispatch(fetchEvents());
  }, [dispatch]);

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(createEvent(newEvent));
    setShowCreateForm(false);
    setNewEvent({
      name: "",
      date: "",
      time: "",
      category: "",
      description: "",
    });
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setNewEvent((prevState) => ({ ...prevState, [name]: value }));
  };

  return (
    <div className={css.container}>
      <Link to="/">   <button><TiArrowBackOutline />
      <br />Back Home Page
      </button></Link>
   
      <button onClick={() => setShowCreateForm(!showCreateForm)}>
<br />
{showCreateForm ? ( <div> <MdEventBusy /> <br/> Cancel </div> ) : ( <div> <MdEventAvailable /> <br/> Create New Event </div> )}
      </button>
      {showCreateForm && (
        <form onSubmit={handleCreate} className={css.container}>
          <label>
            Name:
            <input
              type="text"
              name="name"
              value={newEvent.name}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Date:
            <input
              type="date"
              name="date"
              value={newEvent.date}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Time:
            <input
              type="time"
              name="time"
              value={newEvent.time}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Category:
            <select
              name="category"
              value={newEvent.category}
              onChange={handleChange}
              required
            >
              <option value="">Select Category</option>
              <option value="meeting">Meeting</option>
              <option value="birthday">Birthday</option>
              <option value="workshop">Workshop</option>
              <option value="conference">Conference</option>
              <option value="webinar">Webinar</option>
              <option value="party">Party</option>
            </select>
          </label>
          <label>
            Description:
            <textarea
              name="description"
              value={newEvent.description}
              onChange={handleChange}
              required
            ></textarea>
          </label>
          <button type="submit">Create Event</button>
        </form>
      )}
      <div className={css.eventsList}>
        {events.map((event) => (
          <Event key={event.id} event={event} />
        ))}
      </div>
    </div>
  );
}