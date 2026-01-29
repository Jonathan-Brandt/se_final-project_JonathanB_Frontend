import "./NewsCardList.css";
import NewsCard from "../NewsCard/NewsCard";

function NewsCardList({ newsData }) {
  return (
    <>
      <div className="newscardlist-container">
        <h1 className="newscardlist__header">Search results</h1>
        <ul className="newscardlist">
          {newsData.map((newsData, index) => (
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
        <button className="showmore__button" type="button">
          Show more
        </button>
      </div>
    </>
  );
}

export default NewsCardList;
