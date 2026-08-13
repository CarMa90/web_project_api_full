import React from "react";
import Popup from "./components/Popup/Popup";
import NewCard from "./components/Popup/NewCard/NewCard";
import EditProfile from "./components/Popup/EditProfile/EditProfile";
import EditAvatar from "./components/Popup/EditAvatar/EditAvatar";
import RemoveCard from "./components/Popup/RemoveCard/RemoveCard";
import Card from "./components/Card/Card";
import ImagePopup from "./components/Popup/ImagePopup/ImagePopup";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import editIcon from "../../assets/edit-icon.svg";

export default function Main({
  popup,
  onOpenPopup,
  onClosePopup,
  cards,
  onCardLike,
  onCardDelete,
}) {
  const { currentUser } = React.useContext(CurrentUserContext);

  const newCardPopup = { title: "Nuevo lugar", children: <NewCard /> };
  const editProfilePopup = {
    title: "Editar perfil",
    children: <EditProfile />,
  };
  const editAvatarPopup = {
    title: "Cambiar foto de perfil",
    children: <EditAvatar />,
  };

  return (
    <main className="content">
      <section className="profile page__section">
        <div
          onClick={() => onOpenPopup(editAvatarPopup)}
          className="profile__image-container"
        >
          <img
            className="profile__image"
            src={currentUser.avatar}
            alt={currentUser.name}
          />
          <div className="profile__image-overlay">
            <img src={editIcon} alt="Edit Icon" />
          </div>
        </div>
        <div className="profile__info">
          <h1 className="profile__title">{currentUser.name}</h1>
          <button
            aria-label="Editar perfil"
            className="profile__edit-button"
            type="button"
            onClick={() => {
              onOpenPopup(editProfilePopup);
            }}
          ></button>
          <p className="profile__description">{currentUser.about}</p>
        </div>
        <button
          aria-label="Agregar tarjeta"
          className="profile__add-button"
          type="button"
          onClick={() => {
            onOpenPopup(newCardPopup);
          }}
        ></button>
      </section>
      <section className="cards page__section">
        <ul className="cards__list">
          {cards.map((item) => (
            <Card
              key={item._id}
              card={item}
              handleOpenPopup={onOpenPopup}
              onCardLike={onCardLike}
              onCardDelete={onCardDelete}
            />
          ))}
        </ul>
      </section>
      {popup && (
        <Popup onClose={onClosePopup} title={popup.title}>
          {popup.children}
        </Popup>
      )}
    </main>
  );
}
