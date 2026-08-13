import React from "react";
import { useContext } from "react";
import { SubmitCardContext } from "../../../../../contexts/SubmitCardContext";

export default function RemoveCard(id) {
  const { handleCardDelete } = useContext(SubmitCardContext);
  // console.log(id);

  const handleSubmit = (e) => {
    e.preventDefault();
    handleCardDelete(id.id);
  };

  return (
    <form
      className="popup__form"
      id="confirmation-form"
      noValidate
      autoComplete="off"
      onSubmit={handleSubmit}
    >
      <input
        className="popup__input popup__input_type_id"
        name="card-id"
        type="hidden"
      />
      <span className="popup__error-message card-id-error-message"></span>
      <button className="button popup__button" type="submit">
        Sí
      </button>
    </form>
  );
}
