import "./Header.css";
import logo from "../../assets/NewsExplorer.svg";

function Header({ onLoginClick }) {
  return (
    <>
      <header className="header">
        <img src={logo} alt="header__logo" className="header__logo" />

        <div className="header__bttn-container">
          <button className="header__home-button">Home</button>

          <button className="header__signin-button" onClick={onLoginClick}>
            Signin
          </button>
        </div>
      </header>
    </>
  );
}

export default Header;
