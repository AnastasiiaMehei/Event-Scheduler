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
import Loader from "../Loader/Loader"; 
import css from "../EventList/EventList.module.css";
import { RootState } from "../../redux/store";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
  const [loading, setLoading] = useState(true); // Add loading state
  const [displayCount, setDisplayCount] = useState(5); // Add state for the number of events to display

  useEffect(() => {
    dispatch(fetchEvents()).then(() => setLoading(false)); // Set loading to false after fetching events
  }, [dispatch]);

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    const isDuplicate = events.some(
      (event) =>
        event.date === newEvent.date && event.time === newEvent.time
    );
    if (isDuplicate) {
      toast.error("An event with the same date and time already exists!");
      return;
    }
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

  const handleFilterChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    switch (name) {
      case "name":
        dispatch(changeEventsFilter(value));
        break;
      case "date":
        dispatch(changeDateFilter(value));
        break;
      case "category":
        dispatch(changeCategoryFilter(value));
        break;
      default:
        break;
    }
  };

  const loadMore = () => {
    setDisplayCount((prevCount) => prevCount + 4); // Increase display count by 4
  };

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
      {loading ? ( // Show loader while loading
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
            <form onSubmit={handleCreate} >
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
            {events.slice(0, displayCount).map((event) => (
              <Event key={event.id} id={event.id} event={event} />
            ))}
          </div>
          <div className={css.loadMoreDiv}>
            {displayCount < events.length && (
              <button onClick={loadMore} className={css.loadMoreBtn}>
                Load More
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
}
