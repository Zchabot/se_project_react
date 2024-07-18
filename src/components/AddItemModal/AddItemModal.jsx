import React from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useFormAndValidation } from "../../utils/hooks/useFormAndValidation";

function AddItemModal({
  isOpen,
  onClose,
  onAddItem,
  submitSuccess,
  isLoading,
  setIsLoading,
}) {
  const { values, handleChange, errors, isValid, resetForm } =
    useFormAndValidation();

  const onFormSubmit = (evt) => {
    evt.preventDefault();
    onAddItem(
      {
        name: values.name,
        imageUrl: values.url,
        weather: values.radio,
      },
      setIsLoading
    );
    if (submitSuccess === true) {
      resetForm();
    }
  };

  return (
    <ModalWithForm
      buttonText="Add garment"
      loadingButtonText="Adding garment..."
      isLoading={isLoading}
      title="New Garment"
      isOpen={isOpen}
      onClose={onClose}
      onFormSubmit={onFormSubmit}
      isValid={isValid}
    >
      <label
        htmlFor="name"
        className={`modal__label ${errors.name && "modal__label_error"}`}
      >
        {`Name${errors.name ? `* (${errors.name})` : ""}`}
        <input
          type="text"
          className={`modal__input ${errors.name && "modal__input_error"}`}
          id="name"
          placeholder="Name"
          value={`${values.name ? `${values.name}` : ""}`}
          name="name"
          onChange={handleChange}
          required
        />
      </label>
      <label
        htmlFor="imageUrl"
        className={`modal__label ${errors.url && "modal__label_error"}`}
      >
        {`Image${errors.url ? `* (${errors.url})` : ""}`}
        <input
          type="url"
          className={`modal__input ${errors.url && "modal__input_error"}`}
          id="imageUrl"
          placeholder="Image URL"
          value={`${values.url ? `${values.url}` : ""}`}
          name="url"
          onChange={handleChange}
          required
        />
      </label>
      <fieldset className="modal__radio-buttons">
        <legend className="modal__legend">Select the weather type:</legend>
        <label
          htmlFor="hot"
          className={`modal__label modal__label_type_radio ${
            values.radio === "hot" && "modal__label_type_radio_checked"
          }`}
        >
          <input
            id="hot"
            type="radio"
            className="modal__radio-input"
            name="radio"
            value="hot"
            checked={values.radio === "hot"}
            onChange={handleChange}
            required
          />
          Hot
        </label>
        <label
          htmlFor="warm"
          className={`modal__label modal__label_type_radio ${
            values.radio === "warm" && "modal__label_type_radio_checked"
          }`}
        >
          <input
            id="warm"
            type="radio"
            className="modal__radio-input"
            name="radio"
            value="warm"
            checked={values.radio === "warm"}
            onChange={handleChange}
            required
          />
          Warm
        </label>
        <label
          htmlFor="cold"
          className={`modal__label modal__label_type_radio ${
            values.radio === "cold" && "modal__label_type_radio_checked"
          }`}
        >
          <input
            id="cold"
            type="radio"
            className="modal__radio-input"
            name="radio"
            value="cold"
            checked={values.radio === "cold"}
            onChange={handleChange}
            required
          />
          Cold
        </label>
      </fieldset>
    </ModalWithForm>
  );
}

export default AddItemModal;
