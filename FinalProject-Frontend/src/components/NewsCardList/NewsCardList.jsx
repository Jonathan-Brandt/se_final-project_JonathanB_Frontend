import "./NewsCardList.css";
import NewsCard from "../NewsCard/NewsCard";

function NewsCardList({ newsData, cardLimit, showMore, cardPageSize }) {
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
              />
            </div>
          ))}
        </ul>
        <button className="showmore__button" type="button" onClick={showMore}>
          Show more
        </button>
      </div>
    </>
  );
}

export default NewsCardList;
