import { useContext, useState, useEffect } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import "./ItemCard.css";

function ItemCard({ item, onCardClick }) {
  const handleCardClick = () => {
    onCardClick(item);
  };

  const { handleCardLike, userData, isLoggedIn } =
    useContext(CurrentUserContext);
  const [isLiked, setIsLiked] = useState(true);

  const onLike = () => {
    handleCardLike({
      cardId: item._id,
      isLiked: isLiked,
      setIsLiked: setIsLiked,
    });
  };

  useEffect(() => {
    const newUserLikes = item.likes;
    const currentUserLikes = newUserLikes.map((user) => {
      return user._id;
    });

    if (
      currentUserLikes.includes(userData._id) ||
      newUserLikes.includes(userData._id)
    ) {
      setIsLiked(true);
    } else {
      setIsLiked(false);
    }
  }, []);

  return (
    <li className="card">
      <header className="card__header">
        <h2 className="card__name">{item.name}</h2>
        <button
          className={`card__like ${isLiked === true && "card__like_liked"} ${
            isLoggedIn === false && "card__like_hidden"
          }`}
          onClick={onLike}
        ></button>
      </header>
      <img
        className="card__image"
        src={item.imageUrl}
        alt={item.name}
        onClick={handleCardClick}
      />
    </li>
  );
}

export default ItemCard;
