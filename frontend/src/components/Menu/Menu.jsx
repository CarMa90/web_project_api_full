import menuHamburguesa from "../../assets/burguer-menu.svg";
import closeIcon from "../../assets/close-icon.svg";
import { useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { removeToken } from "../../utils/token";
import { useNavigate } from "react-router-dom";

function Menu({ visibility, handleVisibility }) {
  const navigate = useNavigate();
  const { userData, setIsLoggedIn, setUserData } =
    useContext(CurrentUserContext);

  const handleLogout = () => {
    setUserData({ email: "" });
    removeToken();
    setIsLoggedIn(false);
    navigate("/signin");
  };

  return (
    <div>
      <div className="menu">
        <p className="menu__email">{userData.email}</p>
        <p className="menu__logout" onClick={handleLogout}>
          Cerrar sesión
        </p>
      </div>
      <img
        className="menu__icon"
        src={visibility ? closeIcon : menuHamburguesa}
        alt={visibility ? "Cerrar menuú" : "Abrir menú"}
        onClick={handleVisibility}
      />
    </div>
  );
}

export default Menu;
