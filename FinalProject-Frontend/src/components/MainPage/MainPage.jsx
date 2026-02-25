import "./MainPage.css";

import { useState } from "react";

function MainPage({ handleSearch }) {
  const [query, setQuery] = useState("");

  const onSearchSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      handleSearch(query);
    }
  };

  return (
    <>
      <main className="main-page">
        <h1 className="main-page__text">What's going on in the world?</h1>
        <p className="main-page__subtext">
          Find the latest new on any topic and save them to your personal
          account
        </p>
        <div className="search-bar__container">
          <form onSubmit={onSearchSubmit} className="search-bar">
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
