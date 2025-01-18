import React, { ReactNode, MouseEvent } from "react";
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
      
        </div>
        {children}
      </div>
    </div>
  );
};

export default Modal;
