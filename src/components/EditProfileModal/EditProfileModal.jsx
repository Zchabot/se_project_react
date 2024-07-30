import React from "react";
import { useEffect, useContext } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useFormAndValidation } from "../../utils/hooks/useFormAndValidation";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import Input from "../Input/Input";

function EditProfileModal({
  isOpen,
  onClose,
  submitSuccess,
  isLoading,
  handleProfileUpdate,
}) {
  const { values, handleChange, errors, isValid, resetForm } =
    useFormAndValidation();

  const { userData } = useContext(CurrentUserContext);

  const onFormSubmit = (evt) => {
    evt.preventDefault();
    handleProfileUpdate({ name: values.name, Avatar: values.avatar });

    if (submitSuccess === true) {
      resetForm();
    }
  };

  useEffect(() => {
    values.name = userData.name;
    values.avatar = userData.avatar;
  }, [isOpen, userData]);

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
      <Input
        id="edit-profile-name"
        errors={errors.name}
        labelText="Name *"
        preErrorMsgTxt=" "
        inputName="name"
        type="text"
        placeholder="Name"
        values={values.name}
        handleChange={handleChange}
        minLength="2"
        maxLength="30"
      />
      <Input
        id="edit-profile-avatar"
        errors={errors.avatar}
        labelText="Avatar *"
        preErrorMsgTxt=" "
        inputName="avatar"
        type="url"
        placeholder="Avatar"
        values={values.avatar}
        handleChange={handleChange}
      />
    </ModalWithForm>
  );
}

export default EditProfileModal;
