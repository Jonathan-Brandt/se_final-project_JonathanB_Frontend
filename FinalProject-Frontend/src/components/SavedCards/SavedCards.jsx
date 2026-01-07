import "./SavedCards.css";

function SavedCardsList({}) {
  return (
    <>
      <header className="header">
        <Link to="/">
          <img src={logo} alt="header__logo" className="header__logo" />
          <button className="header__home-button">Home</button>
        </Link>
        <button className="header__saved-articles-btn">Saved articles</button>
      </header>
      <div className="saved-articles__top">
        <div className="text__container">
          <p className="saved__articles-header">Saved articles</p>
          <p className="saved__articles-txt">
            "name", you have "" saved articles
          </p>
          <p className="saved__articles-kywrds">By keywords:</p>
        </div>
      </div>
      <div className="saved-articles__list"></div>
      <footer className="footer"></footer>
    </>
  );
}

export default SavedCardsList;
