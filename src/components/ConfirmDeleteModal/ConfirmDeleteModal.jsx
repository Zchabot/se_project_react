import "./ConfirmDeleteModal.css";

function ConfirmDeleteModal({ card, isOpen, onClose, handleDeleteItem }) {
  const handleDeleteClick = () => {
    handleDeleteItem(card);
  };

  return (
    <div className={`modal ${isOpen && "modal_opened"}`}>
      <div className="modal__content modal__content_delete-modal">
        <h2 className="modal__delete-confirmation-question">
          Are you sure you want to delete this item? This action is
          irreversible.
        </h2>
        <button
          type="button"
          onClick={handleDeleteClick}
          className="modal__confirm-delete-button"
        >
          Yes, delete item
        </button>
        <button className="modal__cancel-button" onClick={onClose}>
          Cancel
        </button>
        <button
          className="modal__close modal__close_delete-modal"
          onClick={onClose}
        ></button>
      </div>
    </div>
  );
}

export default ConfirmDeleteModal;
