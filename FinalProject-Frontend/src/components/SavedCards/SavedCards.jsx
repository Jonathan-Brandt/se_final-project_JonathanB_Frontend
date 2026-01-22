import "./SavedCards.css";
import NewsCard from "../NewsCard/NewsCard";

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
      {/* import the footer here too, doofus */}
    </>
  );
}

export default SavedCardsList;
