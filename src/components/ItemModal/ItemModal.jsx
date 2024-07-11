import "./ItemModal.css";

function ItemModal({ activeModal, onClose, card }) {
  return (
    <div className={`modal ${activeModal === "preview" && "modal_opened"}`}>
      <div className="modal__content modal__content_item_modal">
        <button
          className="modal__close modal__close_item_modal"
          type="button"
          onClick={onClose}
        ></button>
        <img
          className="modal__image modal__image_item_modal"
          src={card.link}
          alt=""
        />
        <div className="modal__footer modal__footer_item_modal">
          <h2 className="modal__caption">{card.name}</h2>
          <p className="modal__weather">Weather: {card.weather}</p>
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
