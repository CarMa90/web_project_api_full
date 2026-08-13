import { Link } from "react-router-dom";
import { useState } from "react";
import InfoTooltip from "../InfoTooltip/InfoTooltip";

function Register({ handleRegistration }) {
  const [data, setData] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleRegistration(data);
    setData({ email: "", password: "" });
  };

  return (
    <div className="register__content">
      <InfoTooltip />
      <h3 className="register__title">Regístrate</h3>
      <form
        className="register__form"
        autoComplete="off"
        noValidate
        onSubmit={handleSubmit}
      >
        <div>
          <input
            className="register__input register__input_type_email"
            id="email"
            name="email"
            placeholder="Correo electrónico"
            type="email"
            required
            value={data.email}
            onChange={handleChange}
          />
          <span className="register__error-message email-error-message"></span>
          <input
            className="register__input register__input_type_password"
            id="password"
            name="password"
            placeholder="Contraseña"
            type="password"
            minLength={8}
            maxLength={12}
            required
            value={data.password}
            onChange={handleChange}
          />
          <span className="register__error-message password-error-message"></span>
        </div>
        <div>
          <button className="button register__button" type="submit">
            Regístrate
          </button>
          <p className="register__paragraph">
            ¿Ya eres miembro? <Link to="/signin">Inicia sesión aquí</Link>
          </p>
        </div>
      </form>
    </div>
  );
}

export default Register;
