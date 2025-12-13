import "./Header.css";
import logo from "../../assets/NewsExplorer.svg";
import { Link } from "react-router-dom";

function Header(
  {
    // login
    //home navigation
  }
) {
  return (
    <>
      <header className="header">
        <img src={logo} alt="header__logo" className="header__logo" />

        <button className="header__home-button">Home</button>
        <button className="header__signin-button">Signin</button>
      </header>
    </>
  );
}

export default Header;
