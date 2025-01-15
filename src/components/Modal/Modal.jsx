import { MdClose } from "react-icons/md";
import css from "./Modal.module.css"; // Adjust the path as necessary

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className={css.modalBackdrop} onClick={onClose}>
      <div className={css.modalBody}>
        <div className={css.btnsDiv}>
        <button className={css.modalCloseBtn} onClick={onClose}><MdClose />
        </button>
        </div>
        {children}
      </div>
    </div>
  );
};

export default Modal;
