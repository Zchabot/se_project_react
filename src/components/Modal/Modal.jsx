import { useEffect } from "react";
import "./Modal.css";

export const Modal = ({
  isOpen,
  onClose,
  containerClass,
  closeClass,
  children,
}) => {
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  const handleOverlay = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className={`modal ${isOpen && "modal_opened"}`}
      onClick={handleOverlay}
    >
      <div className={`modal__content ${containerClass}`}>
        {children}
        <button
          className={`modal__close ${closeClass}`}
          type="button"
          onClick={onClose}
        />
      </div>
    </div>
  );
};
