import "./ModalWithForm.css";
import { useState } from "react";

function ModalWithForm({
  children,
  buttonText,
  loadingButtonText,
  isLoading,
  title,
  isOpen,
  onClose,
  onFormSubmit,
  isValid,
}) {
  return (
    <div className={`modal ${isOpen && "modal_opened"}`}>
      <div className="modal__content modal__content_form-modal">
        <h2 className="modal__title">{title}</h2>
        <button
          className="modal__close modal__close_form-modal"
          type="button"
          onClick={onClose}
        />
        <form action="" className="modal__form" onSubmit={onFormSubmit}>
          {children}
          <button className="modal__submit" type="submit" disabled={!isValid}>
            {`${isLoading === true ? `${loadingButtonText}` : `${buttonText}`}`}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
