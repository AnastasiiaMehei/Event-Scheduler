import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Select, { SingleValue } from "react-select";
import "react-datepicker/dist/react-datepicker.css";
import Modal from "../Modal/Modal";
import { useDispatch } from "react-redux";
import { deleteEvent, updateEvent } from "../../redux/events/operations";
import { FaTrashCan } from "react-icons/fa6";
import { GrEdit } from "react-icons/gr";
import { MdClose } from "react-icons/md";
import css from "./Event.module.css";

const categories = [
  { value: "meeting", label: "Meeting" },
  { value: "birthday", label: "Birthday" },
  { value: "workshop", label: "Workshop" },
  { value: "conference", label: "Conference" },
  { value: "webinar", label: "Webinar" },
  { value: "party", label: "Party" },
];

interface CategoryOption {
  value: string;
  label: string;
}

interface EventProps {
  id: number;
  event: {
    name: string;
    date: string;
    time: string;
    category: string;
    description: string;
  };
}

const Event: React.FC<EventProps> = ({ id, event }) => {
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedEvent, setEditedEvent] = useState(event);
  const dispatch = useDispatch();

  const handleDelete = () => {
    setShowModal(true);
  };

  const confirmDelete = () => {
    dispatch(deleteEvent(id))
      .then(() => {
        toast.success("Event deleted successfully!");
        setShowModal(false);
      })
      .catch((error) => {
        console.error("Failed to delete event:", error);
        toast.error("Failed to delete event.");
      });
  };

  const cancelDelete = () => {
    setShowModal(false);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEditedEvent((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(updateEvent({ id: event.id, updatedEvent: editedEvent })).then(() => {
        toast.success("Event updated successfully");
        setIsEditing(false);
      })
      .catch((error) => {
        console.error("Failed to update event:", error);
        toast.error("Failed to update event.");
      });
  };

  if (showModal) {
    return (
      <Modal isOpen={showModal} onClose={cancelDelete}>
        <h2>Confirm action</h2>
        <p>Are you sure you want to delete this event?</p>
        <button onClick={confirmDelete}>Yes, delete</button>
        <button onClick={cancelDelete}>Cancel</button>
      </Modal>
    );
  }

  if (isEditing) {
    return (
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={editedEvent.name}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Date:</label>
          <input
            type="date"
            name="date"
            value={editedEvent.date}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Time:</label>
          <input
            type="time"
            name="time"
            value={editedEvent.time}
            onChange={handleChange}
          />
        </div>
        <label>Category:</label>
        <Select
          options={categories}
          value={categories.find((cat) => cat.value === editedEvent.category)}
          onChange={(selectedOption: SingleValue<CategoryOption>) =>
            setEditedEvent((prev) => ({
              ...prev,
              category: selectedOption ? selectedOption.value : "",
            }))
          }
        />
        <div>
          <label>Description:</label>
          <textarea
            name="description"
            value={editedEvent.description}
            onChange={handleChange}
          ></textarea>
        </div>
        <div>
          <button type="submit">Save</button>
        </div>
      </form>
    );
  }

  return (
    <div className={css.container}>
      <h3>{event.name}</h3>
      <p>
        <span className={css.span}>Date:</span> {event.date}
      </p>
      <p>
        <span className={css.span}>Time:</span> {event.time}
      </p>
      <p>
        <span className={css.span}>Category:</span> {event.category}
      </p>
      <p>
        <span className={css.span}>Description:</span> {event.description}
      </p>
      <div className={css.btns}>
        <button type="button" onClick={handleEdit}>
          <GrEdit />
        </button>
        <button className={css.btn} onClick={handleDelete}>
          <FaTrashCan />
        </button>
      </div>
    </div>
  );
};

export default Event;
