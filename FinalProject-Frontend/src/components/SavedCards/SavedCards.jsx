import "./SavedCards.css";
import NewsCard from "../NewsCard/NewsCard";

function SavedCardsList({ savedCards }) {
  return (
    <>
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
        {savedCards.map((card, index) => (
          <NewsCard
            key={card._id || index}
            cardImg={card.imageUrl}
            cardDate={card.date}
            cardTitle={card.title}
            cardBody={card.description}
            cardSource={card.sourece}
          />
        ))}
      </div>
      {/* import the footer here too, doofus */}
    </>
  );
}

export default SavedCardsList;
