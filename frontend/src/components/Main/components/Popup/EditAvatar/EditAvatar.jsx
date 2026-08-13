import React from "react";
import { useContext } from "react";
import { CurrentUserContext } from "../../../../../contexts/CurrentUserContext";

export default function EditAvatar() {
  const userContext = useContext(CurrentUserContext);
  const { handleUpdateAvatar } = userContext;

  const urlRef = React.useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    handleUpdateAvatar({ avatar: urlRef.current.value });
  };

  return (
    <form
      className="popup__form"
      id="profile-image-form"
      noValidate
      autoComplete="off"
      onSubmit={handleSubmit}
    >
      <input
        className="popup__input popup__input_type_url"
        name="profile-image"
        placeholder="Enlace a la foto de perfil"
        type="url"
        ref={urlRef}
        required
      />
      <span className="popup__error-message profile-image-error-message"></span>
      <button className="button popup__button" type="submit">
        Guardar
      </button>
    </form>
  );
}
