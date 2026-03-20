import "./MainPage.css";

import { useState } from "react";

function MainPage({ handleSearch, query, setQuery }) {
  const onSearchSubmit = (e) => {
    e.preventDefault();

    if (query.trim()) {
      handleSearch(query);
    }
  };

  const isFormFilled = query.length > 0;

  const handleChange = (e) => {
    setQuery(e.target.value);
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
              onChange={handleChange}
              placeholder="Enter topic"
            />
            <button
              className={
                !isFormFilled
                  ? "search-bar__button_disabled"
                  : "search-bar__button"
              }
              type="submit"
              disabled={!isFormFilled}
            >
              Search
            </button>
          </form>
        </div>
      </main>
    </>
  );
}

export default MainPage;
