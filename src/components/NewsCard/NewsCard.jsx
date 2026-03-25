import "./NewsCard.css";
import { useLocation } from "react-router-dom";

function NewsCard({
  cardImg,
  cardDate,
  cardTitle,
  cardBody,
  cardSource,
  onSaveCard,
  cardData,
  isLoggedIn,
  deleteCard,
  savedCards,
}) {
  const isHomePage = useLocation().pathname === "/";
  const isSavedPage = useLocation().pathname === "/saved";

  const rawBody = cardBody || "";
  const cleanedBody = rawBody
    .replace(/\s*\[\+?\d+\s*chars\]$/i, "")
    .replace(/\s*\[[^\]]+\]$/g, "")
    .trim();
  const shortBody =
    cleanedBody.length > 200
      ? `${cleanedBody.slice(0, 200).trim()}...`
      : cleanedBody;

  const formatDateMMDDYYYY = (iso) => {
    if (!iso) return "";
    const d = new Date(iso);
    if (isNaN(d.getTime())) return iso;
    const mm = String(d.getUTCMonth() + 1).padStart(2, "0");
    const dd = String(d.getUTCDate()).padStart(2, "0");
    const yyyy = d.getUTCFullYear();
    return `${mm}/${dd}/${yyyy}`;
  };
  const displayDate = formatDateMMDDYYYY(cardDate);
  const displaySource =
    typeof cardSource === "string" ? cardSource : cardSource?.name || "";

  const getSourceName = (source) =>
    typeof source === "string" ? source : source?.name || "";

  const getCardFingerprint = (card) => {
    const title = card?.title || cardTitle || "";
    const date = card?.date || card?.publishedAt || cardDate || "";
    const imageUrl = card?.imageUrl || card?.urlToImage || cardImg || "";
    const sourceName = getSourceName(card?.source || cardSource);

    return `${title}|${date}|${imageUrl}|${sourceName}`;
  };

  const isCardSaved = savedCards?.some(
    (saved) => getCardFingerprint(saved) === getCardFingerprint(cardData),
  );

  return (
    <div className="news-card">
      <div className="news-card__wrapper">
        <div className="news-card__img-container">
          <img
            src={cardImg}
            alt="news card: image"
            className="news-card__img"
          />
        </div>
        <div className="news-card__header">
          <h2 className="news-card__date">{displayDate}</h2>
          <h1 className="news-card__title">{cardTitle}</h1>
        </div>

        <p className="news-card__body-txt">{shortBody}</p>

        <p className="news-card__footer">{displaySource}</p>
      </div>

      {isHomePage ? (
        <button
          className={
            isCardSaved && isLoggedIn
              ? "news-card_saved"
              : "news-card__save-button"
          }
          type="button"
          onClick={() => onSaveCard(cardData)}
        ></button>
      ) : (
        <button
          className="news-card__delete-button"
          type="button"
          onClick={() => deleteCard(cardData)}
        ></button>
      )}

      {!isLoggedIn && isHomePage && (
        <div className="news-card__login-hint-container">
          <p className="news-card__login-hint">Sign in to save articles</p>
        </div>
      )}

      {isLoggedIn && isSavedPage && (
        <div className="news-card__login-hint-container">
          <p className="news-card__login-hint">remove article</p>
        </div>
      )}

      {isLoggedIn && isSavedPage && cardData.query && (
        <div className="news-card__keyword-container">
          <p className="news-card__keyword">{cardData.query}</p>
        </div>
      )}
    </div>
  );
}

export default NewsCard;
