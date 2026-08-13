import { Link } from "react-router-dom";
import { useState } from "react";
import InfoTooltip from "../InfoTooltip/InfoTooltip";

function Login({ handleLogin }) {
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
    handleLogin(data);
  };

  return (
    <div className="login__content">
      <InfoTooltip />
      <h3 className="login__title">Inicia sesión</h3>
      <form
        className="login__form"
        autoComplete="off"
        noValidate
        onSubmit={handleSubmit}
      >
        <div>
          <input
            className="login__input login__input_type_email"
            id="email"
            name="email"
            placeholder="Correo electrónico"
            type="email"
            required
            value={data.email}
            onChange={handleChange}
          />
          <span className="login__error-message email-error-message"></span>
          <input
            className="login__input login__input_type_password"
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
          <span className="login__error-message password-error-message"></span>
        </div>
        <div>
          <button className="button login__button" type="submit">
            Inicia sesión
          </button>
          <p className="login__paragraph">
            ¿Aún no eres miembro? <Link to="/signup">Regístrate aquí</Link>
          </p>
        </div>
      </form>
    </div>
  );
}

export default Login;
