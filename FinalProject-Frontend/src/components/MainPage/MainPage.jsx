import "./MainPage.css";

import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { newsApiBaseUrl } from "../../utils/api";

function MainPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("q" || ""));

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchParams({ q: query });
  };

  useEffect(() => {
    const currentQuery = searchParams.get("q");
    if (currentQuery) {
      console.log(`Searching for: ${currentQuery}`);
    }
  }, [searchParams]);

  return (
    <>
      <main className="main-page">
        <h1 className="main-page__text">What's going on in the world?</h1>
        <p className="main-page__subtext">
          Find the latest new on any topic and save them to your personal
          account
        </p>
        <div className="search-bar__container">
          <form onSubmit={handleSearch} className="search-bar">
            <input
              type="text"
              className="search-bar__input"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Enter topic"
            />
            <button className="search-button" type="submit">
              Search
            </button>
          </form>
        </div>
      </main>
    </>
  );
}

export default MainPage;
