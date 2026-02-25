import "./App.css";
import { use, useEffect, useState } from "react";

import {
  Route,
  Routes,
  useNavigate,
  useLocation,
  useSearchParams,
} from "react-router-dom";

import Header from "../Header/Header";
import MainPage from "../MainPage/MainPage";
import SavedCardsList from "../SavedCards/SavedCards";
import About from "../About/About";
import Footer from "../Footer/Footer";
import NewsCardList from "../NewsCardList/NewsCardList";
import LoginModal from "../LoginModal/LoginModal";
import RegisterModal from "../RegisterModal/RegisterModal";
import PreLoader from "../PreLoader/PreLoader";
import { newsApiBaseUrl, saveArticle, getNewsArticles } from "../../utils/api";
import { authorize, checkToken } from "../../utils/auth";

function App() {
  // simple placeholder data

  //const cardData = [
  //   {
  //     id: 1,
  //     imageUrl:
  //       "https://media.istockphoto.com/id/182820338/photo/blue-crab-on-dock.jpg?s=612x612&w=0&k=20&c=08bMr4A8-IV_FoaQsUSik9wc11SRCQ0wI4kGZT6JDH8=",
  //     date: "December 19, 2025",
  //     title: "Placeholder text for Jimbo the crab",
  //     body: "Ah jeez! It's Jimbo the placeholder crab! That's right, this absolutely meaningless crustacean is on your door steps just straight ding dong ditching this news card into absolute oblivion. At least until I get the api stuf working!",
  //     source: "joemama",
  //     keywords: "Crabs n stuff",
  //   },
  // ];

  //states

  const navigate = useNavigate();
  const location = useLocation();

  const [activeModal, setActiveModal] = useState("");

  const [cardLimit, setCardLimit] = useState(3);
  const [cardPageSize, setCardPageSize] = useState(false);

  const [newsData, setNewsData] = useState([]);

  const [loading, setLoading] = useState(false);
  const [hasFetched, setHasFetched] = useState(false);

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [savedCards, setSavedCards] = useState([]);
  const [isSaved, setIsSaved] = useState(false);

  const [currentUser, setCurrentUser] = useState(null);

  // handlers

  const handleSaveCard = async (card) => {
    try {
      const savedArticle = await saveArticle(card);
      setSavedCards([...savedCards, savedArticle]);
    } catch (error) {
      console.log("Failed to save article:", error);
    }
    setIsSaved(true);
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
    if (cardLimit === 3) {
      setCardLimit(6);
    } else {
      setCardLimit(3);
    }

    setCardPageSize(!cardPageSize);
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
      setCurrentUser(userData.data);
      setIsLoggedIn(true);
      closeModal();
      console.log("yippe!!!");
    } catch (error) {
      console.error("Login failed:", error);
    }
  }

  const handleLogout = () => {
    setCurrentUser(null);
    setIsLoggedIn(false);
    closeModal();
  };

  // effects

  useEffect(() => {
    getNewsData();
  }, []);

  //main content

  if (loading) {
    return <PreLoader isLoading={loading} />;
  }

  return (
    <div className="page">
      <div className="page__content">
        {location.pathname === "/" && <div className="content__cover"></div>}
        <Header
          onLoginClick={onLoginClick}
          onSignupClick={onSignupClick}
          goToSaved={goToSaved}
          goHome={goHome}
          isLoggedIn={isLoggedIn}
          logout={handleLogout}
        />
        <Routes>
          <Route path="/" element={<MainPage handleSearch={handleSearch} />} />
          <Route
            path="/saved"
            element={
              <SavedCardsList
                savedCards={savedCards}
                isSaved={isSaved}
                currentUser={currentUser}
              />
            }
          />
        </Routes>
        {location.pathname === "/" && (
          <NewsCardList
            cardLimit={cardLimit}
            newsData={newsData}
            showMore={showMore}
            cardPageSize={cardPageSize}
            onSaveCard={handleSaveCard}
            isSaved={isSaved}
          />
        )}
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
  );
}

export default App;
