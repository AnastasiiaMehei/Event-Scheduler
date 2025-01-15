import React, { useState } from "react";
import Select from 'react-select';
import "react-datepicker/dist/react-datepicker.css";

import EditEventModal from "../EditEventModal/EditEventModal";

import { FaTrashCan } from "react-icons/fa6";
import { GrEdit } from "react-icons/gr";

import css from "./Event.module.css";

const categories = [
  { value: "meeting", label: "Meeting" },
  { value: "birthday", label: "Birthday" },
  { value: "workshop", label: "Workshop" },
  { value: "conference", label: "Conference" },
  { value: "webinar", label: "Webinar" },
  { value: "party", label: "Party" },
];

export default function Event({ id, event }) {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [category, setCategory] = useState(null);
  const [description, setDescription] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedEvent, setEditedEvent] = useState(event);

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedContact((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updatEvent({ eventId: id, updatedData: editedEvent }))
      .then(() => {
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
         <label>Date:</label>
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
        <label>Time:</label>
        <input type="time" value={time} onChange={(e) => setTime(e.target.value)} />
        <label>Category:</label>
        <Select
          options={categories}
          value={category}
          onChange={setCategory}
        />
        <label>Description:</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
        <button type="submit">Save</button>
      </form>
    );
  }

  const handleDateChange = (e) => setDate(e.target.value);
  const handleTimeChange = (e) => setTime(e.target.value);
  const handleCategoryChange = (category) => setCategory(category);
  const handleDescriptionChange = (e) => setDescription(e.target.value);
  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  return (

    <div className={css.container}>
      <h3>Event Details</h3>
      <label>Date:</label>
      <input type="date" value={date} onChange={handleDateChange} />
      <label>Time:</label>
      <input type="time" value={time} onChange={handleTimeChange} />
      <label>Category:</label>
      <Select
        options={categories}
        value={category}
        onChange={handleCategoryChange}
      />
      <label>Description:</label>
      <textarea
        value={description}
        onChange={handleDescriptionChange}
      ></textarea>
      <button type="button" onClick={handleEdit}>
      <GrEdit />
      </button>
      <button className={css.btn} onClick={handleDelete}>
            <FaTrashCan />
          </button>
      <EditEventModal 
        show={showModal} 
        handleClose={handleCloseModal} 
        date={date}
        time={time}
        category={category}
        description={description}
        setDate={setDate}
        setTime={setTime}
        setCategory={setCategory}
        setDescription={setDescription}
      />
    </div>
  );
}
