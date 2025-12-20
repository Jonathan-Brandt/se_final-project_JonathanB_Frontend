import "./NewsCard.css";

function NewsCard({ cardImg, cardDate, cardTitle, cardBody, cardSource }) {
  return (
    <>
      <div className="news-card">
        <div className="news-card__img-container">
          <button className="save-card__button" type="button"></button>

          <img src={cardImg} alt="crab :)" className="news-card__img" />
        </div>
        <div className="news-card__header">
          <h2 className="news-card__date">{cardDate}</h2>
          <h1 className="news-card__title">{cardTitle}</h1>
        </div>

        <p className="news-card__body-txt">{cardBody}</p>

        <p className="news-card__footer">{cardSource}</p>
      </div>
    </>
  );
}

export default NewsCard;
