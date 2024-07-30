import { useContext } from "react";
import "./ItemModal.css";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import { Modal } from "../Modal/Modal";

function ItemModal({ isOpen, onClose, card, handleDeleteClick, cardOwner }) {
  const onDeleteClick = () => {
    handleDeleteClick();
  };

  const { userData } = useContext(CurrentUserContext);

  const isOwn = cardOwner === userData._id;

  const itemDeleteButtonClassName = `modal__delete-item-button ${
    isOwn
      ? "modal__delete-item-button_visible"
      : "modal__delete-item-button_hidden"
  }`;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      containerClass="modal__content_type_item_modal"
      closeClass="modal__close_item_modal"
    >
      <img
        className="modal__image modal__image_item_modal"
        src={card.imageUrl}
        alt={card.name}
      />
      <div className="modal__footer modal__footer_item_modal">
        <h2 className="modal__caption">{card.name}</h2>
        <p className="modal__weather">Weather: {card.weather}</p>
        <button
          className={itemDeleteButtonClassName}
          type="button"
          onClick={onDeleteClick}
        >
          Delete item
        </button>
      </div>
    </Modal>
  );
}

export default ItemModal;
