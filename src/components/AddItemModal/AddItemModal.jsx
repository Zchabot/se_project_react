import React from "react";
import { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

function AddItemModal({ isOpen, onClose, onAddItem, clothingItems }) {
  const [invalidInput, setInvalidInput] = useState(true);
  const [validationMessage, setValidationMessage] = useState("");
  const [selectedRadioButton, setSelectedButton] = useState("");
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const [weatherType, setWeatherType] = useState("");

  const handleValidation = (evt) => {
    setInvalidInput(`${evt.target.validity.valid}, ${evt.target.id}`);
    setValidationMessage(evt.target.validationMessage);
  };

  const handleNameInput = (evt) => {
    setName(evt.target.value);
    handleValidation(evt);
  };

  const handleUrlInput = (evt) => {
    setUrl(evt.target.value);
    handleValidation(evt);
  };

  const handleWeatherTypeInput = (evt) => {
    setWeatherType(evt.target.value);
    onRadioButtonChange(evt);
  };

  const onRadioButtonChange = (evt) => {
    setSelectedButton(evt.target.value);
  };

  const onFormSubmit = (evt) => {
    onAddItem(evt, {
      _id: clothingItems.length,
      name: name,
      imageUrl: url,
      weather: weatherType,
    });
  };

  const onFormReset = () => {
    setSelectedButton("");
  };

  return (
    <ModalWithForm
      buttnText="Add garment"
      title="New Garment"
      isOpen={isOpen}
      onClose={onClose}
      onFormSubmit={onFormSubmit}
      onFormReset={onFormReset}
    >
      <label
        htmlFor="name"
        className={`modal__label ${
          invalidInput === "false, name" && "modal__label_error"
        }`}
      >
        {`Name${
          invalidInput === "false, name" ? `* (${validationMessage})` : ""
        }`}
        <input
          type="text"
          className={`modal__input ${
            invalidInput === "false, name" && "modal__input_error"
          }`}
          id="name"
          placeholder="Name"
          onChange={handleNameInput}
          required
        />
      </label>
      <label
        htmlFor="imageUrl"
        className={`modal__label ${
          invalidInput === "false, imageUrl" && "modal__label_error"
        }`}
      >
        {`Image${
          invalidInput === "false, imageUrl" ? `* (${validationMessage})` : ""
        }`}
        <input
          type="url"
          className={`modal__input ${
            invalidInput === "false, imageUrl" && "modal__input_error"
          }`}
          id="imageUrl"
          placeholder="Image URL"
          onChange={handleUrlInput}
          required
        />
      </label>
      <fieldset className="modal__radio-buttons">
        <legend className="modal__legend">Select the weather type:</legend>
        <label
          htmlFor="hot"
          className={`modal__label modal__label_type_radio ${
            selectedRadioButton === "hot" && "modal__label_type_radio_checked"
          }`}
        >
          <input
            id="hot"
            type="radio"
            className="modal__radio-input"
            name="radio-button"
            value="hot"
            checked={selectedRadioButton === "hot"}
            onChange={handleWeatherTypeInput}
            required
          />
          Hot
        </label>
        <label
          htmlFor="warm"
          className={`modal__label modal__label_type_radio ${
            selectedRadioButton === "warm" && "modal__label_type_radio_checked"
          }`}
        >
          <input
            id="warm"
            type="radio"
            className="modal__radio-input"
            name="radio-button"
            value="warm"
            checked={selectedRadioButton === "warm"}
            onChange={handleWeatherTypeInput}
            required
          />
          Warm
        </label>
        <label
          htmlFor="cold"
          className={`modal__label modal__label_type_radio ${
            selectedRadioButton === "cold" && "modal__label_type_radio_checked"
          }`}
        >
          <input
            id="cold"
            type="radio"
            className="modal__radio-input"
            name="radio-button"
            value="cold"
            checked={selectedRadioButton === "cold"}
            onChange={handleWeatherTypeInput}
            required
          />
          Cold
        </label>
      </fieldset>
    </ModalWithForm>
  );
}

export default AddItemModal;
