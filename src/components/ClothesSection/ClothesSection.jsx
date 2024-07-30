import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import "./ClothesSection.css";
import ItemCard from "../ItemCard/ItemCard";

function ClothesSection({
  onCardClick,
  onDeleteClick,
  handleAddClick,
  clothingItems,
}) {
  const { userData } = useContext(CurrentUserContext);

  return (
    <div className="clothes-section">
      <div className="clothes-section__header">
        <p className="clothes-section__items-title">Your Items</p>
        <button
          type="button"
          className="clothes-section__add-card-button"
          onClick={handleAddClick}
        >
          + Add new
        </button>
      </div>
      <ul className="clothes-section__items">
        {clothingItems
          .filter((item) => {
            if (item.owner && typeof item.owner !== "string") {
              return item.owner._id === userData._id;
            }
            return item.owner === userData._id;
          })
          .map((item) => {
            return (
              <ItemCard
                key={item._id}
                item={item}
                onCardClick={onCardClick}
                onDeleteClick={onDeleteClick}
              />
            );
          })}
      </ul>
    </div>
  );
}

export default ClothesSection;
