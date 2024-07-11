import { useState } from "react";
import "./ModalWithForm.css";

function ModalWithForm({ children, buttnText, title, isOpen, onClose }) {
  const [isDisabled, setIsDisabled] = useState(true);

  const handleButtonState = (evt) => {
    const form = evt.target.form;
    if (form.checkValidity() === true) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  };

  return (
    <div className={`modal ${isOpen && "modal_opened"}`}>
      <div className="modal__content">
        <h2 className="modal__title">{title}</h2>
        <button className="modal__close" type="button" onClick={onClose} />
        <form action="" className="modal__form" onChange={handleButtonState}>
          {children}
          <button className="modal__submit" type="submit" disabled={isDisabled}>
            {buttnText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
