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
    onAddItem({
      name: values.name,
      imageUrl: values.url,
      weather: values.radio,
    });
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
        errors={errors.url}
        labelText="Image"
        preErrorMsgTxt="* "
        inputName="url"
        type="url"
        placeholder="Image"
        values={values.url}
        handleChange={handleChange}
      />
      <fieldset className="modal__radio-buttons">
        <legend className="modal__legend">Select the weather type:</legend>
        <RadioInput
          id="add-item-hot"
          inputName="radio"
          value="hot"
          valuesName={values.radio}
          handleChange={handleChange}
          text="Hot"
        />
        <RadioInput
          id="add-item-warm"
          inputName="radio"
          value="warm"
          valuesName={values.radio}
          handleChange={handleChange}
          text="Warm"
        />
        <RadioInput
          id="add-item-cold"
          inputName="radio"
          value="cold"
          valuesName={values.radio}
          handleChange={handleChange}
          text="Cold"
        />
      </fieldset>
    </ModalWithForm>
  );
}

export default AddItemModal;
