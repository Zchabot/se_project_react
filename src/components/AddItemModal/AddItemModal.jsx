import React, { useEffect } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useFormAndValidation } from "../../utils/hooks/useFormAndValidation";
import Input from "../Input/Input";
import RadioInput from "../RadioInput/RadioInput";

function AddItemModal({
  isOpen,
  onClose,
  onAddItem,
  submitSuccess,
  isLoading,
}) {
  const { values, handleChange, errors, isValid, resetForm } =
    useFormAndValidation();

  const onFormSubmit = (evt) => {
    evt.preventDefault();
    onAddItem(values);
  };

  useEffect(() => {
    if (submitSuccess === true) {
      resetForm();
    }
  }, [submitSuccess]);

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
      <Input
        id="add-item-name"
        errors={errors.name}
        labelText="Name"
        preErrorMsgTxt="* "
        inputName="name"
        type="text"
        placeholder="Name"
        values={values.name}
        handleChange={handleChange}
        minLength="2"
        maxLength="30"
      />
      <Input
        id="add-item-imageUrl"
        errors={errors.imageUrl}
        labelText="Image"
        preErrorMsgTxt="* "
        inputName="imageUrl"
        type="url"
        placeholder="Image"
        values={values.imageUrl}
        handleChange={handleChange}
      />
      <fieldset className="modal__radio-buttons">
        <legend className="modal__legend">Select the weather type:</legend>
        <RadioInput
          id="add-item-hot"
          inputName="weather"
          value="hot"
          valuesName={values.weather}
          handleChange={handleChange}
          text="Hot"
        />
        <RadioInput
          id="add-item-warm"
          inputName="weather"
          value="warm"
          valuesName={values.weather}
          handleChange={handleChange}
          text="Warm"
        />
        <RadioInput
          id="add-item-cold"
          inputName="weather"
          value="cold"
          valuesName={values.weather}
          handleChange={handleChange}
          text="Cold"
        />
      </fieldset>
    </ModalWithForm>
  );
}

export default AddItemModal;
