import "./Header.css";
import logo from "../../assets/NewsExplorer.svg";
import logosaved from "../../assets/logo-savedpage.svg";
import logout from "../../assets/logout.svg";
import logoutWhite from "../../assets/logout-white.svg";
import mobile from "../../assets/mobile-menu.svg";
import mobileSaved from "../../assets/menu-svdpg.svg";
import { useLocation } from "react-router-dom";
import { useContext, useState } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function Header({ onLoginClick, goToSaved, goHome, isLoggedIn, signout }) {
  const isSavedPage = useLocation().pathname === "/saved";

  const [subMenuOpen, setSubMenuOpen] = useState(false);

  const toggleMenu = () => {
    setSubMenuOpen(!subMenuOpen);
  };

  const currentUser = useContext(CurrentUserContext);
  return (
    <>
      <header className="header__mobile">
        {subMenuOpen && (
          <div className="header__mobile-overlay">
            <div className="header__mobile-menu">
              <button
                onClick={toggleMenu}
                type="button"
                className="header__mobile-close"
              ></button>
              {isSavedPage ? (
                <img src={logo} alt="header__logo" className="header__logo" />
              ) : (
                <img src={logo} alt="header__logo" className="header__logo" />
              )}

              <div className="header__mobile-buttons">
                <button
                  className={`header__home-button ${
                    !isSavedPage ? "header__nav-active-light" : ""
                  }`}
                  onClick={goHome}
                >
                  Home
                </button>
                {isLoggedIn && (
                  <button
                    className={`header__saved-button ${
                      isSavedPage ? "header__nav-active-light" : ""
                    }`}
                    onClick={goToSaved}
                  >
                    Saved Articles
                  </button>
                )}
              </div>

              {!isLoggedIn ? (
                <button
                  className="header__signin-button"
                  onClick={onLoginClick}
                >
                  Signin
                </button>
              ) : (
                <div className="header__signout-container">
                  <button className="header__signout-bttn" onClick={signout}>
                    {currentUser.firstName}
                    <img
                      src={logoutWhite}
                      alt="logout"
                      className="logout-icon"
                    />
                  </button>
                </div>
              )}
            </div>{" "}
          </div>
        )}
      </header>
      <header className={isSavedPage ? "header_saved" : "header"}>
        {isSavedPage ? (
          <img src={logosaved} alt="header__logo" className="header__logo" />
        ) : (
          <img src={logo} alt="header__logo" className="header__logo" />
        )}

        <div className="header__bttn-container">
          <button
            className={
              !isSavedPage
                ? "header__home-button header__nav-active-light"
                : "header__home-svpg"
            }
            onClick={goHome}
          >
            Home
          </button>
          {isLoggedIn && (
            <button
              className={
                !isSavedPage
                  ? "header__saved-button"
                  : "header__saved-button_saved header__nav-active-dark"
              }
              onClick={goToSaved}
            >
              Saved Articles
            </button>
          )}

          {!isLoggedIn ? (
            <button className="header__signin-button" onClick={onLoginClick}>
              Signin
            </button>
          ) : (
            <div
              className={
                !isSavedPage
                  ? "header__signout-container"
                  : "header__signout-container_saved"
              }
            >
              <button
                className={
                  !isSavedPage
                    ? "header__signout-bttn"
                    : "header__signout-button_saved"
                }
                onClick={signout}
              >
                {currentUser.firstName}
                <img
                  src={!isSavedPage ? logoutWhite : logout}
                  alt="logout"
                  className="logout-icon"
                />
              </button>
            </div>
          )}
          <button className="mobile-menu__btn">
            <img
              src={!isSavedPage ? mobile : mobileSaved}
              alt="mobile menu"
              onClick={toggleMenu}
            />
          </button>
        </div>
      </header>
    </>
  );
}

export default Header;
