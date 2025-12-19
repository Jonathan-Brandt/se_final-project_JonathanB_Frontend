import "./NewsCardList.css";

function NewsCardList() {
  return (
    <>
      <div className="newscardlist">
        <h1 className="newscardlist__header">Search results</h1>
        <button className="showmore__button" type="button">
          Show more
        </button>
      </div>
    </>
  );
}

export default NewsCardList;
