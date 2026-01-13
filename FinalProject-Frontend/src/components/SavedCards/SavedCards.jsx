import "./SavedCards.css";
import { Link } from "react-router-dom";
import NewsCard from "../NewsCard/NewsCard";
import logo from "../../assets/NewsExplorer.svg";

function SavedCardsList({
  cardImg,
  cardDate,
  cardTitle,
  cardBody,
  cardSource,
}) {
  return (
    // would be easier if I just IMPORT THE HEADER lol
    <>
      <header className="saved-cards__header">
        <Link to="/">
          <img src={logo} alt="header__logo" className="header__logo" />
          <button className="header__home-button">Home</button>
        </Link>
        <button className="header__saved-articles-btn">Saved articles</button>
      </header>
      <div className="saved-articles__top">
        <div className="text__container">
          <p className="saved-articles__header-txt">Saved articles</p>
          <p className="saved-articles__txt">
            "name", you have " " saved articles
          </p>
          <p className="saved-articles__kywrds-lst">
            By keywords:
            <span className="keywords"> JIMBO THE CRAB BAYBEEEEEEEE</span>
          </p>
        </div>
      </div>
      <div className="saved-articles__list">
        <NewsCard
          cardImg={cardImg}
          cardDate={cardDate}
          cardTitle={cardTitle}
          cardBody={cardBody}
          cardSource={cardSource}
        ></NewsCard>
      </div>
      <footer className="footer"></footer>
    </>
  );
}

export default SavedCardsList;
