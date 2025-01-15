import React, { useEffect } from 'react';
import Select from 'react-select';
import css from './EditEventModal.module.css';

const categories = [
  { value: "meeting", label: "Meeting" },
  { value: "birthday", label: "Birthday" },
  { value: "workshop", label: "Workshop" },
  { value: "conference", label: "Conference" },
  { value: "webinar", label: "Webinar" },
  { value: "party", label: "Party" },
];

export default function EditEventModal({ show, handleClose, date, time, category, description, setDate, setTime, setCategory, setDescription }) {
  const showHideClassName = show ? `${css.modal} ${css.displayBlock}` : `${css.modal} ${css.displayNone}`;

  useEffect(() => {
    const handleEscapeKeyPress = (event) => {
      if (event.key === 'Escape') {
        handleClose();
      }
    };
    document.addEventListener('keydown', handleEscapeKeyPress);
    return () => {
      document.removeEventListener('keydown', handleEscapeKeyPress);
    };
  }, [handleClose]);

  const handleBackdropClick = (event) => {
    if (event.target.className.includes(css.modal)) {
      handleClose();
    }
  };

  return (
    <div className={showHideClassName} onClick={handleBackdropClick}>
      <div className={css.modalMain}>
        <span className={css.close} onClick={handleClose}>&times;</span>
        <h3>Edit Event</h3>
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
      </div>
    </div>
  );
}
