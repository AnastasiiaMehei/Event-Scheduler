import React, { ReactNode, MouseEvent } from "react";
import { MdClose } from "react-icons/md";
import css from "./Modal.module.css"; // Adjust the path as necessary

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  const handleBackdropClick = (event: MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return (
    <div className={css.modalBackdrop} onClick={handleBackdropClick}>
      <div className={css.modalBody}>
        <div className={css.btnsDiv}>
          <button className={css.modalCloseBtn} onClick={onClose}>
            <MdClose />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

export default Modal;
