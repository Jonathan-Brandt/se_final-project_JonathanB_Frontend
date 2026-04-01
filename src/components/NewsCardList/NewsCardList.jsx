import "./NewsCardList.css";
import NewsCard from "../NewsCard/NewsCard";
import error from "../../assets/not-found_v1.svg";

function NewsCardList({
  newsData = [],
  cardLimit,
  showMore,
  onSaveCard,
  isLoggedIn,
  savedCards,
  noSearchResults,
  searchError,
  query,
  hasSubmittedSearch,
  loading,
  hasFetched,
}) {
  const visibleCards = newsData.slice(0, cardLimit);
  const hasCompletedSearch = hasSubmittedSearch && hasFetched && !loading;
  const hasCards = hasCompletedSearch && visibleCards.length > 0;
  const canShowMore = newsData.length > cardLimit;
  const searchedTerm = query?.trim() || "";

  return (
    <div className="news-card-list ">
      {!hasSubmittedSearch && (
        <>
          <section>
            <img
              className="news-card-list__not-found"
              src={error}
              alt="articles not found"
            />
            <p className="news-card-list__nothing-found">Nothing Found</p>
            <p className="news-card-list__status news-card-list__status_empty">
              Search for a topic to see find articles.
            </p>
          </section>
        </>
      )}

      {searchError && hasCompletedSearch && (
        <>
          <section>
            <img
              className="news-card-list__not-found"
              src={error}
              alt="articles not found"
            />
            <p className="news-card-list__status news-card-list__status_error">
              {searchError}
            </p>
          </section>
        </>
      )}

      {noSearchResults && (
        <>
          <section>
            <img
              className="news-card-list__not-found"
              src={error}
              alt="articles not found"
            />
            <p className="news-card-list__status news-card-list__status_empty">
              No matches found for "{searchedTerm}". Try another using other
              keywords.
            </p>
          </section>
        </>
      )}

      {hasCards && (
        <>
          <h1 className="news-card-list__header">Search results</h1>
          <ul className="news-card-list__container">
            {visibleCards.map((newsItem, index) => (
              <li className="news-card-list__item" key={index}>
                <NewsCard
                  cardImg={newsItem.urlToImage}
                  cardDate={newsItem.publishedAt}
                  cardTitle={newsItem.title}
                  cardBody={newsItem.content}
                  cardSource={newsItem.source.name}
                  onSaveCard={onSaveCard}
                  cardData={newsItem}
                  savedCards={savedCards}
                  isLoggedIn={isLoggedIn}
                />
              </li>
            ))}
          </ul>
        </>
      )}

      {hasCards && canShowMore && (
        <button
          className="news-card-list__show-more-button"
          type="button"
          onClick={showMore}
        >
          Show more
        </button>
      )}
    </div>
  );
}

export default NewsCardList;
