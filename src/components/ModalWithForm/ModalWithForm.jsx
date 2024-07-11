import { useState } from "react";
import "./ModalWithForm.css";

function ModalWithForm({ children, buttnText, title, activeModal, onClose }) {
  const [inputIsValid, setInputIsValid] = useState(true);

  const handleButtonState = (evt) => {
    const form = evt.target.form;
    if (form.checkValidity() === true) {
      form.querySelector(".modal__submit").removeAttribute("disabled");
    }
  };

  return (
    <div className={`modal ${activeModal === "add-garment" && "modal_opened"}`}>
      <div className="modal__content">
        <h2 className="modal__title">{title}</h2>
        <button
          className="modal__close"
          type="button"
          onClick={onClose}
        ></button>
        <form action="" className="modal__form" onChange={handleButtonState}>
          {children}
          <button className="modal__submit" type="submit" disabled>
            {buttnText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
