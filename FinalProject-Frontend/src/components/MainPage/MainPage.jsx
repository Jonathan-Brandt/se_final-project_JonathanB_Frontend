import "./MainPage.css";

function MainPage() {
  return (
    <>
      <main className="main-page">
        <h1 className="main-page__text">What's going on in the world?</h1>
        <p className="main-page__subtext">
          Find the latest new on any topic and save them to your personal
          account
        </p>
        <div className="search-bar__container">
          <form action="" className="search-bar">
            <input
              type="text"
              className="search-bar__input"
              placeholder="Enter topic"
            />
            <button className="search-button" type="button">
              Search
            </button>
          </form>
        </div>
      </main>
    </>
  );
}

export default MainPage;
