import "./Footer.css";
import ghLogo from "../../assets/github.png";
import lnkdInLogo from "../../assets/LinkedIn.png";

function Footer() {
  return (
    <>
      <div className="footer">
        <p className="footer__copyright">©Supersite, Powered by News API</p>
        <div className="footer__links-container">
          <p className="footer__home">Home</p>
          <p className="footer__TripleTen-link">Triple Ten</p>
          <img src={ghLogo} alt="github Link" className="footer__ghLogo" />
          <img
            src={lnkdInLogo}
            alt="LinkedIn Link"
            className="footer__lnkdInLogo"
          />
        </div>
      </div>
    </>
  );
}

export default Footer;
