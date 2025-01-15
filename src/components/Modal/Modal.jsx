import css from "./Modal.module.css"; // Adjust the path as necessary

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className={css.modalBackdrop} onClick={onClose}>
      <div className={css.modalBody}>
        <button className={css.modalCloseBtn} onClick={onClose}></button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
