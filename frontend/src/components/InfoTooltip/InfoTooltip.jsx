import successIcon from "../../assets/success.svg";
import failIcon from "../../assets/fail.svg";
import { useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function InfoTooltip() {
  const { isOpen, success, setIsOpen, errorResponse } =
    useContext(CurrentUserContext);

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <div className={`info-tooltip ${isOpen && "info-tooltip_is-opened"}`}>
      <div className="info-tooltip__content">
        <button
          aria-label="Cerrar ventana emergente"
          className="info-tooltip__close"
          type="button"
          onClick={handleClose}
        ></button>
        <img
          src={success ? successIcon : failIcon}
          alt={success ? "Registro exitoso" : "Error en registro"}
        />
        <h3 className="info-tooltip__title">
          {success ? "¡Correcto! Ya estás registrado." : errorResponse}
        </h3>
      </div>
    </div>
  );
}

export default InfoTooltip;
