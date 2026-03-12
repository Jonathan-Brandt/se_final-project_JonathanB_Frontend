import "./NewsCardList.css";
import NewsCard from "../NewsCard/NewsCard";

function NewsCardList({
  newsData,
  cardLimit,
  showMore,
  cardPageSize,
  onSaveCard,
  isLoggedIn,
  savedCards,
}) {
  return (
    <>
      <div
        className={`newscardlist-container ${cardPageSize ? "newscardlist-expanded" : "newscardlist-container"}`}
      >
        <h1 className="newscardlist__header">Search results</h1>
        <ul className="newscardlist">
          {newsData.slice(0, cardLimit).map((newsData, index) => (
            <div key={index}>
              <NewsCard
                cardImg={newsData.urlToImage}
                cardDate={newsData.publishedAt}
                cardTitle={newsData.title}
                cardBody={newsData.content}
                cardSource={newsData.source.name}
                onSaveCard={onSaveCard}
                cardData={newsData}
                savedCards={savedCards}
                isLoggedIn={isLoggedIn}
              />
            </div>
          ))}
        </ul>
        {cardLimit === 3 ? (
          <button className="showmore__button" type="button" onClick={showMore}>
            Show more
          </button>
        ) : (
          <button className="showmore__button" type="button" onClick={showMore}>
            Show less
          </button>
        )}
      </div>
    </>
  );
}

export default NewsCardList;
