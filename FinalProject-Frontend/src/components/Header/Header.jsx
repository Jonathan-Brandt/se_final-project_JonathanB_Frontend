import "./Header.css";
import logo from "../../assets/NewsExplorer.svg";
import logosaved from "../../assets/logo-savedpage.svg";
import mobile from "../../assets/mobile-menu.svg";
import { useLocation } from "react-router-dom";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function Header({ onLoginClick, goToSaved, goHome, isLoggedIn }) {
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
          <button className="header__home-button" onClick={goHome}>
            Home
          </button>
          {isLoggedIn && (
            <button className="header__saved-button" onClick={goToSaved}>
              Saved Articles
            </button>
          )}

          <button className="header__signin-button" onClick={onLoginClick}>
            Signin
          </button>

          <button className="mobile-menu__btn">
            <img src={mobile} alt="mobile menu " />
          </button>
        </div>
      </header>
    </>
  );
}

export default Header;
