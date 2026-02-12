import axios from "axios";


export const newsApiBaseUrl =
  process.env.NODE_ENV === "production"
    ? "https://nomoreparties.co/news/v2/everything"
    : "https://newsapi.org/v2/everything?q=crabs&apiKey=7617cea592d842e0bf0658c647fc7daa&pageSize=6";

function getResponse(res) {
  return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
}

export { getResponse };

function limitCharacters() {
  axios.interceptors.response.use(
    function (response) {
      const characterLimit = 200;
      if (
        Array.isArray(response.data) &&
        response.data.length > characterLimit
      ) {
        response.data =
          response.data.slice(0, characterLimit) + "... (truncated)";
      }
      return response;
    },
    function (error) {
      return getResponse(error);
    },
  );
}

export { limitCharacters };
