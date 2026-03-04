import "./SavedCards.css";
import NewsCard from "../NewsCard/NewsCard";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import { useLocation } from "react-router-dom";
import { useContext } from "react";

function SavedCardsList({ savedCards, deleteCard, isLoggedIn }) {
  const isSavedPage = useLocation().pathname === "/saved";
  const currentUser = useContext(CurrentUserContext);
  return (
    <>
      <div className="saved-articles__top">
        <div className="text__container">
          <p className="saved-articles__header-txt">Saved articles</p>
          <p className="saved-articles__txt">
            {currentUser.firstName}, you have {savedCards.length} saved articles
          </p>
          <p className="saved-articles__kywrds-lst">
            By keywords:
            <span className="keywords"> JIMBO THE CRAB BAYBEEEEEEEE</span>
          </p>
        </div>
      </div>
      <div className="saved-articles__list">
        {savedCards.map((card, index) => (
          <NewsCard
            key={card._id || index}
            cardImg={card.imageUrl}
            cardDate={card.date}
            cardTitle={card.title}
            cardBody={card.description}
            cardSource={card.source}
            deleteCard={deleteCard}
            cardData={card}
            isLoggedIn={isLoggedIn}
          />
        ))}
      </div>
    </>
  );
}

export default SavedCardsList;
