import "./Header.css";
import logo from "../../assets/NewsExplorer.svg";
import logosaved from "../../assets/logo-savedpage.svg";
import logout from "../../assets/logout.svg";
import logoutWhite from "../../assets/logout-white.svg";
import mobile from "../../assets/mobile-menu.svg";
import { useLocation } from "react-router-dom";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function Header({ onLoginClick, goToSaved, goHome, isLoggedIn, signout }) {
  const isSavedPage = useLocation().pathname === "/saved";

  const currentUser = useContext(CurrentUserContext);
  return (
    <>
      <header className={isSavedPage ? "header__saved" : "header"}>
        {isSavedPage ? (
          <img src={logosaved} alt="header__logo" className="header__logo" />
        ) : (
          <img src={logo} alt="header__logo" className="header__logo" />
        )}

        <div className="header__bttn-container">
          <button
            className={
              !isSavedPage ? "header__home-button" : "header__home-svpg"
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
                  : "header__saved-bttn-svpg"
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
                  ? "signout__bttn-container"
                  : "bttn-container__svpg"
              }
            >
              <button
                className={
                  !isSavedPage ? "header__signout-bttn" : "signout-bttn__svpg"
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
            <img src={mobile} alt="mobile menu " />
          </button>
        </div>
      </header>
    </>
  );
}

export default Header;
