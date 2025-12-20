import "./NewsCardList.css";
import NewsCard from "../NewsCard/NewsCard";

function NewsCardList() {
  return (
    <>
      <div className="newscardlist-container">
        <h1 className="newscardlist__header">Search results</h1>
        <ul className="newscardlist">
          <NewsCard></NewsCard>
        </ul>
        <button className="showmore__button" type="button">
          Show more
        </button>
      </div>
    </>
  );
}

export default NewsCardList;
