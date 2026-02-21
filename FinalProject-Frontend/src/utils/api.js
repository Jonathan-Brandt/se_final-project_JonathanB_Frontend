export const newsApiBaseUrl =
  process.env.NODE_ENV === "production"
    ? "https://nomoreparties.co/news/v2/everything"
    : "https://newsapi.org/v2/everything?q=crabs&apiKey=7617cea592d842e0bf0658c647fc7daa&pageSize=6";

function getResponse(res) {
  return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
}

export { getResponse };

export function getItems() {
  return new Promise((resolve, reject) =>
    resolve([
      {
        _id: "69952646d702a13f75036e8e",
        title: "Crabs are based",
        description: "read the title",
      },
    ]),
  );
}

export function saveArticle(article) {
  return new Promise((resolve, reject) => {
    resolve({
      _id: "69952646d702a13f75036e8f",
      sourece: article.source.name,
      title: article.title,
      description: article.description,
      imageUrl: article.urlToImage,
      date: article.publishedAt,
    });
  });
}
