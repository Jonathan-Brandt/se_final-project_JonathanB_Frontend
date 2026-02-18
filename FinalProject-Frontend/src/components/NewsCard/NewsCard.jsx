import "./NewsCard.css";

function NewsCard({ cardImg, cardDate, cardTitle, cardBody, cardSource }) {
  // Remove API-added bracket suffixes (e.g. "[+123 chars]") and truncate to 200 chars
  const rawBody = cardBody || "";
  const cleanedBody = rawBody
    .replace(/\s*\[\+?\d+\s*chars\]$/i, "") // common NewsAPI suffix
    .replace(/\s*\[[^\]]+\]$/g, "") // fallback: remove any trailing [...] block
    .trim();
  const shortBody =
    cleanedBody.length > 200
      ? `${cleanedBody.slice(0, 200).trim()}...`
      : cleanedBody;

  // Format ISO date (e.g. 2026-01-19T16:10:33Z) to MM/DD/YYYY (uses UTC to preserve published date)
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

  return (
    <>
      <button className="save-card__button" type="button"></button>
      <div className="news-card">
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

        <p className="news-card__footer">{cardSource}</p>
      </div>
    </>
  );
}

export default NewsCard;
