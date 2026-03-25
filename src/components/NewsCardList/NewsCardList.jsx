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
      <div className="news-card-list ">
        <h1 className="news-card-list__header">Search results</h1>
        <ul className="news-card-list__container">
          {newsData.slice(0, cardLimit).map((newsData, index) => (
            <li className="news-card-list__item" key={index}>
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
            </li>
          ))}
        </ul>

        <button
          className="news-card-list__show-more-button"
          type="button"
          onClick={showMore}
        >
          Show more
        </button>
      </div>
    </>
  );
}

export default NewsCardList;
