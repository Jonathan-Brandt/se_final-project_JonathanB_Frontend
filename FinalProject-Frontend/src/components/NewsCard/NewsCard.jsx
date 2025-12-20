import "./NewsCard.css";
import jimbo from "../../assets/finalproject__placeholder-img.jpg";

function NewsCard() {
  return (
    <>
      <div className="news-card">
        <div className="news-card__img-container">
          <button className="save-card__button" type="button"></button>

          <img src={jimbo} alt="crab :)" className="news-card__img" />
        </div>
        <div className="news-card__header">
          <h2 className="news-card__date">December 19,2025</h2>
          <h1 className="news-card__title">
            Placeholder text for Jimbo the crab.
          </h1>
        </div>

        <p className="news-card__body-txt">
          Ah jeez! It's JIMBO THE PLACEHOLDER. That's right, this absolutely
          meaningless crustacean is on your door steps just straight ding dong
          ditching this news card into oblivion, and to make sure the card
          styling is all set before I do api stuffs
        </p>

        <p className="news-card__footer">JOEMAMA</p>
      </div>
    </>
  );
}

export default NewsCard;
