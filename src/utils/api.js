export const newsApiBaseUrl =
  process.env.NODE_ENV === "production"
    ? "https://nomoreparties.co/news/v2/everything"
    : "https://newsapi.org/v2/everything/";

const apiKey = "7617cea592d842e0bf0658c647fc7daa";

function getResponse(res) {
  return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
}

export { getResponse };

export function getNewsArticles(query = "") {
  const url = `${newsApiBaseUrl}?q=${encodeURIComponent(query)}&apiKey=${apiKey}&pageSize=60`;
  return fetch(url).then(getResponse);
}

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

export async function saveArticle(article, query) {
  console.log(query);
  return new Promise((resolve, reject) => {
    resolve({
      _id: "69952646d702a13f75036e8f",
      source: article.source,
      title: article.title,
      description: article.description,
      imageUrl: article.urlToImage,
      date: article.publishedAt,
      query: query,
    });
  });
}
