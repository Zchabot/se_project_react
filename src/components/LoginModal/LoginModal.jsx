import React from "react";
import { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useFormAndValidation } from "../../utils/hooks/useFormAndValidation";
import "./LoginModal.css";

function LoginModal({
  isOpen,
  onClose,
  submitSuccess,
  isLoading,
  setIsLoading,
  handleLogin,
  handleSignupButton,
}) {
  const { values, handleChange, errors, isValid, resetForm } =
    useFormAndValidation();

  const [data, setData] = useState({
    email: "",
    password: "",
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
    handleLogin(data, setIsLoading);

    if (submitSuccess === true) {
      resetForm();
    }
  };

  return (
    <ModalWithForm
      buttonText="Log In"
      loadingButtonText="Logging In..."
      isLoading={isLoading}
      title="Log In"
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
      <button
        onClick={handleSignupButton}
        className={`${
          isLoading === false
            ? "modal__signup_nav-login-modal"
            : "modal__signup_nav-login-modal_load"
        }`}
        type="button"
      >
        or Sign up
      </button>
    </ModalWithForm>
  );
}

export default LoginModal;
