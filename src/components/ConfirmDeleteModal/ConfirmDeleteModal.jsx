import "./ConfirmDeleteModal.css";
import { Modal } from "../Modal/Modal";

function ConfirmDeleteModal({
  card,
  isOpen,
  onClose,
  handleDeleteItem,
  isLoading,
  setIsLoading,
}) {
  const handleDeleteClick = () => {
    handleDeleteItem(card, setIsLoading);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      containerClass="modal__content_type_delete-modal"
      closeClass="modal__close_delete-modal"
    >
      <h2 className="modal__delete-confirmation-question">
        Are you sure you want to delete this item? This action is irreversible.
      </h2>
      <button
        type="button"
        onClick={handleDeleteClick}
        className="modal__confirm-delete-button"
      >
        {`${isLoading === true ? `Deleting item...` : `Yes, delete item`}`}
      </button>
      <button className="modal__cancel-button" onClick={onClose}>
        Cancel
      </button>
    </Modal>
  );
}

export default ConfirmDeleteModal;
