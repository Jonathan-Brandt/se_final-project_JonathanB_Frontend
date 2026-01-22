import "./Footer.css";
import { Link } from "react-router-dom";
import ghLogo from "../../assets/github.png";
import lnkdInLogo from "../../assets/LinkedIn.png";

function Footer() {
  return (
    <>
      <div className="footer">
        <p className="footer__copyright">
          © 2026 Supersite, Powered by News API
        </p>
        <div className="footer__links-container">
          <p className="footer__home">
            <Link to="/">Home</Link>
          </p>
          <p className="footer__TripleTen-link">
            <a
              href="https://tripleten.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              Triple Ten
            </a>
          </p>
          <a
            href="https://github.com/Jonathan-Brandt"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={ghLogo} alt="github Link" className="footer__ghLogo" />
          </a>

          <a
            href="https://www.linkedin.com/in/jonathan-william-brandt/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src={lnkdInLogo}
              alt="LinkedIn Link"
              className="footer__lnkdInLogo"
            />
          </a>
        </div>
      </div>
    </>
  );
}

export default Footer;
