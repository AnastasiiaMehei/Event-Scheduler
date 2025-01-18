import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { TiArrowBackOutline } from "react-icons/ti";
import { MdEventBusy, MdEventAvailable } from "react-icons/md";
import { Link } from "react-router-dom";
import {
  fetchEvents,
  createEvent,
} from "../../redux/events/operations";
import Event from "../Event/Event";
import Loader from "../Loader/Loader"; 
import { toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import { parseISO, isSameDay } from 'date-fns'; 
import { IoReloadOutline } from "react-icons/io5";
import css from "../EventList/EventList.module.css";

interface NewEvent {
  name: string;
  date: string;
  time: string;
  category: string;
  description: string;
}

interface EventData {
  eventId: string;
  name: string;
  date: string;
  time: string;
  category: string;
  description: string;
}

const truncateText = (text: string, length: number) => {
  return text.length > length ? text.substring(0, length) + "..." : text;
};

export default function EventList() {
  const dispatch = useDispatch();
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newEvent, setNewEvent] = useState<NewEvent>({
    name: "",
    date: "",
    time: "",
    category: "",
    description: "",
  });
  const [loading, setLoading] = useState(true);
  const [displayCount, setDisplayCount] = useState(5);
  const [nameTooLong, setNameTooLong] = useState(false);
  const [descriptionTooLong, setDescriptionTooLong] = useState(false);
  const [events, setEvents] = useState<EventData[]>([]);
  
  // Local state for filters
  const [nameFilter, setNameFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");

  useEffect(() => {
    dispatch(fetchEvents()).then((result) => {
      const { data } = result.payload; // Assuming `result.payload` contains the full API response
      setEvents(data); // Explicitly setting the events state with the data from the response
      setLoading(false);
    }).catch((error) => {
      console.error('Error fetching events:', error);
    });
  }, [dispatch]);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    const isDuplicate = events.some(
      (event) =>
        event.date === newEvent.date && event.time === newEvent.time
    );
    if (isDuplicate) {
      toast.error("An event with the same date and time already exists!");
      return;
    }
    await dispatch(createEvent(newEvent));
    dispatch(fetchEvents()).then((result) => {
      const { data } = result.payload; // Assuming `result.payload` contains the full API response
      setEvents(data); // Explicitly setting the events state with the data from the response
      setLoading(false);
    }); // Fetch events again after creating a new event
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
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setNewEvent((prevState) => ({ ...prevState, [name]: value }));

    if (name === "name" && value.length > 20) {
      setNameTooLong(true);
    } else {
      setNameTooLong(false);
    }

    if (name === "description" && value.length > 50) {
      setDescriptionTooLong(true);
    } else {
      setDescriptionTooLong(false);
    }
  };

  const handleFilterChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    if (name === "name") {
      setNameFilter(value);
    } else if (name === "date") {
      setDateFilter(value);
    } else if (name === "category") {
      setCategoryFilter(value);
    }
  };

  const handleUpdate = (updatedEvent: EventData) => {
    setEvents((prevEvents) =>
      prevEvents.map((event) =>
        event._id === updatedEvent._id ? updatedEvent : event
      )
    );
  };

  const handleDelete = (deletedEventId: string) => {
    setEvents((prevEvents) =>
      prevEvents.filter((event) => event._id !== deletedEventId)
    );
  };

  const loadMore = () => {
    setDisplayCount((prevCount) => prevCount + 4);
  };

  // Filter events locally
  const filteredEvents = events.filter((event) => {
    const matchesName = !nameFilter || event.name.toLowerCase().includes(nameFilter.toLowerCase());
    const matchesDate = !dateFilter || isSameDay(parseISO(event.date), parseISO(dateFilter));
    const matchesCategory = !categoryFilter || event.category === categoryFilter;
    return matchesName && matchesDate && matchesCategory;
  });

  return (
    <div className={css.container}>
      <div className={css.navBtns}>
        <Link to="/">
          <button>
            <TiArrowBackOutline />
            <br />
            Back Home Page
          </button>
        </Link>
        <button onClick={() => setShowCreateForm(!showCreateForm)}>
          <br />
          {showCreateForm ? (
            <div>
              <MdEventBusy />
              <br /> Cancel
            </div>
          ) : (
            <div>
              <MdEventAvailable />
              <br /> Create New Event
            </div>
          )}
        </button>
      </div>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className={css.filters}>
            <input
              type="text"
              name="name"
              placeholder="Search by name"
              onChange={handleFilterChange}
            />
            <input
              type="date"
              name="date"
              placeholder="Filter by date"
              onChange={handleFilterChange}
            />
            <select name="category" onChange={handleFilterChange}>
              <option value="">Filter by category</option>
              <option value="meeting">Meeting</option>
              <option value="birthday">Birthday</option>
              <option value="workshop">Workshop</option>
              <option value="conference">Conference</option>
              <option value="webinar">Webinar</option>
              <option value="party">Party</option>
            </select>
          </div>
          {showCreateForm && (
            <form onSubmit={handleCreate}>
              <label>
                Name:
                <input
                  type="text"
                  name="name"
                  value={truncateText(newEvent.name, 20)}
                  onChange={handleChange}
                  required
                />
                {nameTooLong && (
                  <p className={css.warning}>Name cannot exceed 20 characters.</p>
                )}
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
                  maxLength={50}
                  required
                ></textarea>
                {descriptionTooLong && (
                  <p className={css.warning}>
                    Description cannot exceed 50 characters.
                  </p>
                )}
              </label>
              <button type="submit">Create Event</button>
            </form>
          )}
          <ul className={css.eventsList}>
            {filteredEvents.slice(0, displayCount).map((event, index) => (
              <li key={`${event.eventId}-${index}`}>
                <Event
                  id={event.eventId}
                  event={event}
                  onUpdate={handleUpdate}
                  onDelete={handleDelete}
                />
              </li>
            ))}
          </ul>
          <div className={css.loadMoreDiv}>
            {displayCount < filteredEvents.length && (
              <button onClick={loadMore} className={css.loadMoreBtn}>
                <IoReloadOutline />
                Load More
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
}