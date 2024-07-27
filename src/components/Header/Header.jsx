import { useContext } from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import logo from "../../assets/logo.svg";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function Header({
  handleAddClick,
  weatherData,
  handleOpenMenu,
  handleCloseMenu,
  openMenu,
  openLoginModal,
  openRegisterModal,
}) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  const { isLoggedIn, userData, hasAvatar } = useContext(CurrentUserContext);

  return (
    <header className="header">
      <Link to="/">
        <img src={logo} alt="wtwr logo" className="header__logo" />
      </Link>
      <p className="header__date-and-location">
        {currentDate}, {weatherData.city}
      </p>
      <nav
        className={`header__menu ${openMenu === true && "header__menu-mobile"}`}
      >
        <ToggleSwitch />
        <button
          className="header__menu-close-button"
          type="button"
          onClick={handleCloseMenu}
        ></button>
        <button
          className={`header__add-clothes-button ${
            isLoggedIn === false && "header__add-clothes-button_hidden"
          }`}
          type="button"
          onClick={handleAddClick}
        >
          + Add clothes
        </button>
        <Link to="/profile" className="header__link">
          <div
            className={`header__user-container ${
              isLoggedIn === false && "header__user-container_hidden"
            }`}
          >
            <p className="header__username">{userData.name}</p>
            <img
              src={userData.avatar}
              alt={userData.name}
              className={`header__avatar ${
                hasAvatar === false && "header__avatar_hidden"
              }`}
            />
            <div
              className={`header__avatar-default ${
                hasAvatar === true && "header__avatar-default_hidden"
              }`}
            >
              {userData.name.slice(0, 1)}
            </div>
          </div>
        </Link>
        <button
          onClick={openRegisterModal}
          className={`header__sign-up ${
            isLoggedIn === true && "header__sign-up_hidden"
          }`}
        >
          Sign Up
        </button>
        <button
          onClick={openLoginModal}
          className={`header__log-in ${
            isLoggedIn === true && "header__log-in_hidden"
          }`}
        >
          Log In
        </button>
      </nav>
      <button className="header__menu-button" onClick={handleOpenMenu}></button>
    </header>
  );
}

export default Header;
