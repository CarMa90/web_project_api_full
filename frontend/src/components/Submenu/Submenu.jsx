import { useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { removeToken } from "../../utils/token";
import { useNavigate } from "react-router-dom";

function Submenu({ visibility }) {
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
    visibility && (
      <div className="menu menu__mobile">
        <p className="menu__email">{userData.email}</p>
        <p className="menu__logout" onClick={handleLogout}>
          Cerrar sesión
        </p>
      </div>
    )
  );
}

export default Submenu;
