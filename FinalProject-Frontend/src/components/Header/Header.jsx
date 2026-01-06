import "./Header.css";
import logo from "../../assets/NewsExplorer.svg";

function Header({ onLoginClick }) {
  return (
    <>
      <header className="header">
        <img src={logo} alt="header__logo" className="header__logo" />

        <button className="header__home-button">Home</button>
        <button className="header__signin-button" onClick={onLoginClick}>
          Signin
        </button>
      </header>
    </>
  );
}

export default Header;
