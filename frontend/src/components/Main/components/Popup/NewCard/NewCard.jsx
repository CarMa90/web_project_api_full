import React from "react";
import { useState, useContext } from "react";
import { SubmitCardContext } from "../../../../../contexts/SubmitCardContext";

export default function NewCard() {
  const { handleAddPlaceSubmit } = useContext(SubmitCardContext);

  const [name, setName] = useState("");
  const [link, setLink] = useState("");

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleLinkChange = (e) => {
    setLink(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleAddPlaceSubmit({ name, link });
    setName("");
    setLink("");
  };

  return (
    <form
      className="popup__form"
      id="new-card-form"
      noValidate
      autoComplete="off"
      onSubmit={handleSubmit}
    >
      <input
        className="popup__input popup__input_type_card-name"
        name="place-name"
        placeholder="Título"
        type="text"
        minLength="2"
        maxLength="30"
        onChange={handleNameChange}
        value={name}
        required
      />
      <span className="popup__error-message place-name-error-message"></span>
      <input
        className="popup__input popup__input_type_url"
        name="link"
        placeholder="Enlace a la imagen"
        onChange={handleLinkChange}
        value={link}
        required
        type="url"
      />
      <span className="popup__error-message link-error-message"></span>
      <button className="button popup__button" type="submit">
        Crear
      </button>
    </form>
  );
}
