import "./Header.css";
import logo from "../../assets/NewsExplorer.svg";
import mobile from "../../assets/mobile-menu.svg";
import { useLocation } from "react-router-dom";

function Header({ onLoginClick, goToSaved, goHome, isLoggedIn }) {
  const isSavedPage = useLocation().pathname === "/saved";
  return (
    <>
      <header className={isSavedPage ? "header header__saved" : "header"}>
        <img src={logo} alt="header__logo" className="header__logo" />

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
