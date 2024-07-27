import React from "react";
import { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useFormAndValidation } from "../../utils/hooks/useFormAndValidation";
import "./RegisterModal.css";

function RegisterModal({
  isOpen,
  onClose,
  submitSuccess,
  isLoading,
  setIsLoading,
  handleRegistration,
  handleLoginButton,
}) {
  const { values, handleChange, errors, isValid, resetForm } =
    useFormAndValidation();

  const [data, setData] = useState({
    email: "",
    password: "",
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
    handleRegistration(data);
    setIsLoading;

    if (submitSuccess === true) {
      resetForm();
    }
  };

  return (
    <ModalWithForm
      buttonText="Sign Up"
      loadingButtonText="Signing Up..."
      isLoading={isLoading}
      title="Sign Up"
      isOpen={isOpen}
      onClose={onClose}
      onFormSubmit={onFormSubmit}
      isValid={isValid}
    >
      <label
        htmlFor="email"
        className={`modal__label ${errors.email && "modal__label_error"}`}
      >
        {`Email*${errors.email ? ` (${errors.email})` : ""}`}
        <input
          type="email"
          className={`modal__input ${errors.email && "modal__input_error"}`}
          id="email"
          placeholder="Email"
          value={`${values.email ? `${values.email}` : ""}`}
          name="email"
          onChange={handleInputChange}
          required
        />
      </label>
      <label
        htmlFor="password"
        className={`modal__label ${errors.password && "modal__label_error"}`}
      >
        {`Password*${errors.password ? ` (${errors.password})` : ""}`}
        <input
          type="text"
          className={`modal__input ${errors.password && "modal__input_error"}`}
          id="password"
          placeholder="Password"
          value={`${values.password ? `${values.password}` : ""}`}
          name="password"
          onChange={handleInputChange}
          required
        />
      </label>
      <label
        htmlFor="name"
        className={`modal__label ${errors.name && "modal__label_error"}`}
      >
        {`Name*${errors.name ? ` (${errors.name})` : ""}`}
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
        {`Avatar URL*${errors.avatar ? ` (${errors.avatar})` : ""}`}
        <input
          type="url"
          className={`modal__input ${errors.avatar && "modal__input_error"}`}
          id="avatar"
          placeholder="Avatar URL"
          value={`${values.avatar ? `${values.avatar}` : ""}`}
          name="avatar"
          onChange={handleInputChange}
          required
        />
      </label>
      <button
        onClick={handleLoginButton}
        className={`${
          isLoading === false
            ? "modal__login_nav-register-modal"
            : "modal__login_nav-register-modal_load"
        }`}
        type="button"
      >
        or Log In
      </button>
    </ModalWithForm>
  );
}

export default RegisterModal;
