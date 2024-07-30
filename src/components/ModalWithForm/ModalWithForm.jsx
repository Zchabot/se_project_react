import { Modal } from "../Modal/Modal";
import Form from "../Form/Form";
import "./ModalWithForm.css";

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
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      containerClass="modal__content_type_form-modal"
      closeClass="modal__close_form-modal"
    >
      <Form
        title={title}
        onFormSubmit={onFormSubmit}
        isValid={isValid}
        isLoading={isLoading}
        loadingButtonText={loadingButtonText}
        buttonText={buttonText}
        children={children}
      />
    </Modal>
  );
}

export default ModalWithForm;
