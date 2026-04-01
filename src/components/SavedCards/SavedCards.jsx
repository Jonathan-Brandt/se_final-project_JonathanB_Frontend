import "./SavedCards.css";
import NewsCard from "../NewsCard/NewsCard";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function SavedCardsList({ savedCards, deleteCard, isLoggedIn }) {
  const currentUser = useContext(CurrentUserContext);
  const uniqueKeywords = [
    ...new Set(savedCards.map((card) => card.query).filter(Boolean)),
  ];
  const keywordsText = uniqueKeywords.join(", ");

  return (
    <>
      <div className="saved-articles">
        <div className="saved-articles__text-container">
          <p className="saved-articles__header-text">Saved articles</p>
          <p className="saved-articles__txt">
            {currentUser.firstName}, you have {savedCards.length} saved articles
          </p>
          <p className="saved-articles__keywords-list">
            By keywords:
            <span className="saved-articles__keywords"> {keywordsText}</span>
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
