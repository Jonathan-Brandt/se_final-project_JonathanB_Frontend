import "./App.css";
import { useEffect, useState } from "react";

import { Route, Routes, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

import Header from "../Header/Header";
import MainPage from "../MainPage/MainPage";
import SavedCardsList from "../SavedCards/SavedCards";
import About from "../About/About";
import Footer from "../Footer/Footer";
import NewsCardList from "../NewsCardList/NewsCardList";
import LoginModal from "../LoginModal/LoginModal";
import RegisterModal from "../RegisterModal/RegisterModal";
import { newsApiBaseUrl, saveArticle } from "../../utils/api";
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
      console.error("Failed to save article:", error);
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

  const showMore = () => {
    if (cardLimit === 3) {
      setCardLimit(6);
    } else {
      setCardLimit(3);
    }

    setCardPageSize(!cardPageSize);
  };

  // functions

  async function getNewsData() {
    setLoading(true);

    const resp = await axios.get(newsApiBaseUrl);

    setNewsData(resp.data.articles);

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

  return (
    <div className="page">
      <div className="page__content">
        <div className="content__cover"></div>
        <Header
          onLoginClick={onLoginClick}
          onSignupClick={onSignupClick}
          goToSaved={goToSaved}
          goHome={goHome}
          isLoggedIn={isLoggedIn}
          logout={handleLogout}
        />
        <Routes>
          <Route path="/" element={<MainPage />} />
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
