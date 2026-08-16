import ImagePopup from "../Popup/ImagePopup/ImagePopup";
import RemoveCard from "../Popup/RemoveCard/RemoveCard";
import { useContext } from "react";
import { CurrentUserContext } from "../../../../contexts/CurrentUserContext";

export default function Card({ card, handleOpenPopup, onCardLike }) {
  const { name, link, _id, likes } = card;
  const { currentUser } = useContext(CurrentUserContext);

  const imageComponent = { children: <ImagePopup card={card} /> };
  const confirmationPopup = (id) => {
    return { title: "¿Estás seguro/a?", children: <RemoveCard id={id} /> };
  };

  return (
    <li className="card">
      <img
        className="card__image"
        src={link}
        alt={name}
        onClick={() => handleOpenPopup(imageComponent)}
      />
      {currentUser._id === card.owner && (
        <button
          aria-label="Delete card"
          className="card__delete-button"
          type="button"
          onClick={() => {
            handleOpenPopup(confirmationPopup(_id));
          }}
        />
      )}
      <div className="card__description">
        <h2 className="card__title">{name}</h2>
        <div className="card__like-space">
          <p>{likes.length}</p>
          <button
            aria-label="Like card"
            type="button"
            className={
              likes.length > 0
                ? "card__like-button card__like-button_is-active"
                : "card__like-button"
            }
            onClick={() => {
              onCardLike(card);
            }}
          />
        </div>
      </div>
    </li>
  );
}
