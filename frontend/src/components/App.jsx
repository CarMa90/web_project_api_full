import Header from "./Header/Header";
import Main from "./Main/Main";
import Footer from "./Footer/Footer";
import { useState, useEffect } from "react";
import { api } from "../utils/api";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { SubmitCardContext } from "../contexts/SubmitCardContext";
import {
  Routes,
  Route,
  Link,
  Navigate,
  useLocation,
  useNavigate,
} from "react-router-dom";
import Login from "./Login/Login";
import Register from "./Register/Register";
import Menu from "./Menu/Menu";
import Submenu from "./Submenu/Submenu";
import ProtectedRoute from "./ProtectedRoute/ProtectedRoute";
import * as auth from "../utils/auth";
import { setToken, getToken, removeToken } from "../utils/token";

function App() {
  const [cards, setCards] = useState([]);

  const getInitialCards = async () => {
    await api.getInitialCards().then((data) => {
      setCards(data);
    });
  };

  async function handleCardlikes(card) {
    await api.handleCardLikes(card).then((newCard) => {
      setCards((state) => {
        return state.map((currentCard) =>
          currentCard._id === card._id ? newCard : currentCard,
        );
      });
    });
  }

  async function handleCardDelete(id) {
    await api.deleteCard(id).then(() => {
      setCards((state) => {
        return state.filter((currentCard) => currentCard._id !== id);
      });
      handleClosePopup();
    });
  }

  const handleAddPlaceSubmit = (data) => {
    (async () => {
      api.getNewCard(data).then((newCard) => {
        setCards([newCard, ...cards]);
        handleClosePopup();
      });
    })();
  };

  const [popup, setPopup] = useState(null);

  function handleOpenPopup(popup) {
    setPopup(popup);
  }

  function handleClosePopup() {
    setPopup(null);
  }

  const [currentUser, setCurrentUser] = useState({});

  const getUserInfo = async () => {
    await api.getUserInfo().then((data) => {
      setCurrentUser(data);
    });
  };

  const handleUpdateUser = (data) => {
    (async () => {
      await api.setUserInfo(data).then((newData) => {
        setCurrentUser(newData);
        handleClosePopup();
      });
    })();
  };

  const handleUpdateAvatar = (data) => {
    (async () => {
      await api.changeProfilePicture(data).then((newData) => {
        setCurrentUser(newData);
        handleClosePopup();
      });
    })();
  };

  const [visibility, setVisibility] = useState(false);

  const handleVisibility = () => {
    setVisibility((prevData) => !prevData);
  };

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState({ email: "" });
  const [success, setSuccess] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [errorResponse, setErrorResponse] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const jwt = getToken();

    if (!jwt) {
      return;
    }

    auth
      .tokenValidation(jwt)
      .then((res) => {
        setIsLoggedIn(true);
        setUserData(res.data);
        getUserInfo();
        getInitialCards();
      })
      .catch((err) => {
        console.log(err);
        removeToken();
        setIsLoggedIn(false);
      });
  }, []);

  const handleRegistration = ({ password, email }) => {
    auth
      .register(password, email)
      .then((res) => {
        console.log(
          `El registro del usuario ${res.data.email} ha sido exitoso!`,
        );
        setSuccess(true);
        setIsOpen(true);
      })
      .catch((err) => {
        setSuccess(false);
        setIsOpen(true);
        setErrorResponse(`${err.error}`);
      });
  };

  const handleLogin = ({ password, email }) => {
    auth
      .authorize(password, email)
      .then((res) => {
        setIsLoggedIn(true);
        setToken(res.token);
        setUserData({ email });
        const redirectPath = location.state?.from?.pathname || "/";
        navigate(redirectPath);
        getUserInfo();
        getInitialCards();
      })
      .catch((err) => {
        setSuccess(false);
        setIsOpen(true);
        setErrorResponse(`${err.error}`);
      });
  };

  return (
    <>
      <SubmitCardContext.Provider
        value={{ handleAddPlaceSubmit, handleCardDelete }}
      >
        <CurrentUserContext.Provider
          value={{
            currentUser,
            handleUpdateUser,
            handleUpdateAvatar,
            isLoggedIn,
            setIsLoggedIn,
            success,
            isOpen,
            setIsOpen,
            errorResponse,
            userData,
            setUserData,
          }}
        >
          <div className="page__content">
            <Routes>
              <Route
                path="/"
                element={
                  <>
                    <ProtectedRoute>
                      <Submenu visibility={visibility} />
                      <Header>
                        <Menu
                          visibility={visibility}
                          handleVisibility={handleVisibility}
                        />
                      </Header>
                      <Main
                        popup={popup}
                        onOpenPopup={handleOpenPopup}
                        onClosePopup={handleClosePopup}
                        cards={cards}
                        onCardLike={handleCardlikes}
                        onCardDelete={handleCardDelete}
                      />
                    </ProtectedRoute>
                  </>
                }
              />
              <Route
                path="/signin"
                element={
                  <>
                    <ProtectedRoute anonymous>
                      <Header>
                        <Link to="/signup">Regístrate</Link>
                      </Header>
                      <Login handleLogin={handleLogin} />
                    </ProtectedRoute>
                  </>
                }
              />
              <Route
                path="/signup"
                element={
                  <>
                    <ProtectedRoute anonymous>
                      <Header>
                        <Link to="/signin">Inicia sesión</Link>
                      </Header>
                      <Register handleRegistration={handleRegistration} />
                    </ProtectedRoute>
                  </>
                }
              />
              <Route
                path="*"
                element={
                  isLoggedIn ? (
                    <Navigate to="/" replace />
                  ) : (
                    <Navigate to="/signin" replace />
                  )
                }
              />
            </Routes>
            <Footer />
          </div>
        </CurrentUserContext.Provider>
      </SubmitCardContext.Provider>
    </>
  );
}

export default App;
