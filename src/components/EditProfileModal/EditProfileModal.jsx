import React from "react";
import { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useFormAndValidation } from "../../utils/hooks/useFormAndValidation";

function EditProfileModal({
  isOpen,
  onClose,
  submitSuccess,
  isLoading,
  handleProfileUpdate,
}) {
  const { values, handleChange, errors, isValid, resetForm } =
    useFormAndValidation();

  const [data, setData] = useState({
    name: "",
    avatar: "",
  });

  const handleInputChange = (evt) => {
    handleChange(evt);
    const { name, value } = evt.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const onFormSubmit = (evt) => {
    evt.preventDefault();
    handleProfileUpdate(data);

    if (submitSuccess === true) {
      resetForm();
    }
  };

  return (
    <ModalWithForm
      buttonText="Save changes"
      loadingButtonText="Saving Changes..."
      isLoading={isLoading}
      title="Change profile data"
      isOpen={isOpen}
      onClose={onClose}
      onFormSubmit={onFormSubmit}
      isValid={isValid}
    >
      <label
        htmlFor="name"
        className={`modal__label ${errors.name && "modal__label_error"}`}
      >
        {`Name *${errors.name ? ` (${errors.name})` : ""}`}
        <input
          type="text"
          className={`modal__input ${errors.name && "modal__input_error"}`}
          id="name"
          placeholder="Name"
          value={`${values.name ? `${values.name}` : ""}`}
          name="name"
          onChange={handleInputChange}
          required
        />
      </label>
      <label
        htmlFor="avatar"
        className={`modal__label ${errors.avatar && "modal__label_error"}`}
      >
        {`Avatar *${errors.avatar ? ` (${errors.avatar})` : ""}`}
        <input
          type="url"
          className={`modal__input ${errors.avatar && "modal__input_error"}`}
          id="avatar"
          placeholder="Avatar"
          value={`${values.avatar ? `${values.avatar}` : ""}`}
          name="avatar"
          onChange={handleInputChange}
          required
        />
      </label>
    </ModalWithForm>
  );
}

export default EditProfileModal;
