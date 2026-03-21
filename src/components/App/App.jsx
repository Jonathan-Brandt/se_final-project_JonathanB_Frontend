import "./App.css";
import { use, useEffect, useState, useContext } from "react";

import { Route, Routes, useNavigate, useLocation } from "react-router-dom";

import Header from "../Header/Header";
import MainPage from "../MainPage/MainPage";
import SavedCardsList from "../SavedCards/SavedCards";
import About from "../About/About";
import Footer from "../Footer/Footer";
import NewsCardList from "../NewsCardList/NewsCardList";
import LoginModal from "../LoginModal/LoginModal";
import RegisterModal from "../RegisterModal/RegisterModal";
import PreLoader from "../PreLoader/PreLoader";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import { saveArticle, getNewsArticles } from "../../utils/api";
import { authorize, checkToken } from "../../utils/auth";

function App() {
  const navigate = useNavigate();
  const location = useLocation();

  const [activeModal, setActiveModal] = useState("");

  const [cardLimit, setCardLimit] = useState(3);
  const [cardPageSize, setCardPageSize] = useState(3);

  const [newsData, setNewsData] = useState([]);

  const [loading, setLoading] = useState(false);
  const [hasFetched, setHasFetched] = useState(false);

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [savedCards, setSavedCards] = useState([]);
  const [isSaved, setIsSaved] = useState(false);

  const [currentUser, setCurrentUser] = useState({});

  const [query, setQuery] = useState("");

  const getSourceName = (source) =>
    typeof source === "string" ? source : source?.name || "";

  const getCardFingerprint = (card) => {
    const title = card?.title || "";
    const date = card?.date || card?.publishedAt || "";
    const imageUrl = card?.imageUrl || card?.urlToImage || "";
    const sourceName = getSourceName(card?.source);

    return `${title}|${date}|${imageUrl}|${sourceName}`;
  };

  // handles

  const handleSaveCard = async (card) => {
    try {
      const savedArticle = await saveArticle(card, query);
      const isAlreadySaved = savedCards.some(
        (savedCard) =>
          getCardFingerprint(savedCard) === getCardFingerprint(savedArticle),
      );
      if (!isAlreadySaved) {
        const updatedCards = [...savedCards, { ...savedArticle, query }];
        setSavedCards(updatedCards);
        localStorage.setItem("cards", JSON.stringify(updatedCards));
        setIsSaved(true);
      } else {
        console.log("Article already saved");
      }
    } catch (error) {
      console.log("Failed to save article:", error);
    }
  };

  const handleDeleteCard = async (card, e) => {
    if (e && typeof e.preventDefault === "function") {
      e.preventDefault();
    }

    if (!isLoggedIn) {
      console.log("Please log in to delete this article");
      return;
    }

    setSavedCards((prev) => {
      const filteredCards = prev.filter((item) => item._id !== card._id);
      localStorage.setItem("cards", JSON.stringify(filteredCards));
      return filteredCards;
    });
  };

  const goToSaved = () => navigate("/saved");
  const goHome = () => navigate("/");

  const onLoginClick = () => {
    setActiveModal("login-user");
  };

  const onSignupClick = () => {
    setActiveModal("new-user");
  };

  const onSecondButtonClick = () => {
    if (activeModal === "login-user") {
      setActiveModal("new-user");
    }
    if (activeModal === "new-user") {
      setActiveModal("login-user");
    }
  };

  const closeModal = () => {
    setActiveModal("");
  };

  const handleSearch = (query) => {
    getNewsData(query);
  };

  const showMore = () => {
    setCardLimit((prev) => prev + 3);

    setCardPageSize((prev) => prev + 3);
  };

  // important functions

  useEffect(() => {
    if (!loading) {
      if (hasFetched && Array.isArray(newsData) && newsData.length === 0) {
        console.log("Sorry, nothing was found.");
      } else if (hasFetched) {
        console.log("News data found");
      }
    }
  }, [loading, newsData, hasFetched]);

  async function getNewsData(query = "news") {
    setLoading(true);
    try {
      const resp = await getNewsArticles(query);
      setNewsData(resp.articles);
      setHasFetched(true);
    } catch (error) {
      console.log(
        "sorry, something went wrong during the request. There may be a connection issue or the server may be down. Please try again later.",
      );
      setHasFetched(true);
    }

    setLoading(false);
  }

  async function handleLogin({ email, password }) {
    try {
      const authResponse = await authorize(email, password);
      const token = authResponse.token;
      const userData = await checkToken(token);
      setCurrentUser(userData.userData);
      setIsLoggedIn(true);
      localStorage.setItem("jwt", authResponse.token);
      localStorage.setItem("currentUser", JSON.stringify(userData.userData));
      closeModal();
      console.log("yippe!!!");
    } catch (error) {
      console.error("Login failed:", error);
    }
  }

  const handleLogout = () => {
    setCurrentUser({ firstName: "", lastName: "" });
    setIsLoggedIn(false);
    closeModal();
    localStorage.removeItem("jwt");
    localStorage.removeItem("currentUser");
  };

  // effects

  useEffect(() => {
    getNewsData();
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    const storedUser = localStorage.getItem("currentUser");
    const storedCards = localStorage.getItem("cards");

    if (token && storedUser) {
      try {
        const userData = JSON.parse(storedUser);
        setCurrentUser(userData);
        setIsLoggedIn(true);
      } catch (error) {
        console.error("Error parsing stored user data:", error);
        localStorage.removeItem("jwt");
        localStorage.removeItem("currentUser");
      }
    }

    if (storedCards) {
      try {
        const parsedCards = JSON.parse(storedCards);

        const uniqueCards = parsedCards.filter(
          (card, index, arr) =>
            arr.findIndex(
              (c) => getCardFingerprint(c) === getCardFingerprint(card),
            ) === index,
        );
        setSavedCards(uniqueCards);
        localStorage.setItem("cards", JSON.stringify(uniqueCards));
      } catch (error) {
        console.error("Error parsing stored cards:", error);
        localStorage.removeItem("cards");
      }
    }
  }, []);

  useEffect(() => {
    const escPress = (event) => {
      if (event.key === "Escape") {
        closeModal();
      }
    };
    if (activeModal) {
      document.addEventListener("keydown", escPress);
    }
    return () => {
      document.removeEventListener("keydown", escPress);
    };
  }, [activeModal]);

  //main content

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <div className="page__content">
          {location.pathname === "/" && <div className="page__cover"></div>}
          <Header
            onLoginClick={onLoginClick}
            onSignupClick={onSignupClick}
            goToSaved={goToSaved}
            goHome={goHome}
            isLoggedIn={isLoggedIn}
            signout={handleLogout}
          />
          <Routes>
            <Route
              path="/"
              element={
                <MainPage
                  handleSearch={handleSearch}
                  query={query}
                  setQuery={setQuery}
                />
              }
            />
            <Route
              path="/saved"
              element={
                <SavedCardsList
                  savedCards={savedCards}
                  deleteCard={handleDeleteCard}
                  isLoggedIn={isLoggedIn}
                />
              }
            />
          </Routes>
          {location.pathname === "/" &&
            (loading ? (
              <PreLoader isLoading={loading} />
            ) : (
              <NewsCardList
                cardLimit={cardLimit}
                newsData={newsData}
                showMore={showMore}
                cardPageSize={cardPageSize}
                onSaveCard={handleSaveCard}
                isSaved={isSaved}
                savedCards={savedCards}
                isLoggedIn={isLoggedIn}
              />
            ))}
          {location.pathname === "/" && <About />}
          <Footer></Footer>{" "}
        </div>
        <LoginModal
          activeModal={activeModal}
          isOpen={activeModal === "login-user"}
          loginClick={onLoginClick}
          onSecondButtonClick={onSecondButtonClick}
          closeModal={closeModal}
          onLoginModalSubmit={handleLogin}
        />

        <RegisterModal
          activeModal={activeModal}
          isOpen={activeModal === "new-user"}
          registerClickClick={onSignupClick}
          onSecondButtonClick={onSecondButtonClick}
          closeModal={closeModal}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
