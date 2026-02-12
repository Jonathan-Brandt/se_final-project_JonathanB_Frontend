import "./App.css";
import { useEffect, useState } from "react";

import { Route, Routes } from "react-router-dom";
import axios from "axios";

import Header from "../Header/Header";
import MainPage from "../MainPage/MainPage";
import SavedCardsList from "../SavedCards/SavedCards";
import About from "../About/About";
import Footer from "../Footer/Footer";
import NewsCardList from "../NewsCardList/NewsCardList";
import LoginModal from "../LoginModal/LoginModal";
import RegisterModal from "../RegisterModal/RegisterModal";
import { getResponse, newsApiBaseUrl } from "../../utils/api";

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

  const [activeModal, setActiveModal] = useState("");
  const [activePage, setActivePage] = useState("");

  const [cardLimit, setCardLimit] = useState(3);
  const [cardPageSize, setCardPageSize] = useState(false);

  const [newsData, setNewsData] = useState([]);
  const [loading, setLoading] = useState(false);

  // handlers

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

    getResponse();
  }

   
  // effects

  useEffect(() => {
    getNewsData();
  }, []);

  return (
    <div className="page">
      <div className="page__content">
        <div className="content__cover"></div>
        <Header onLoginClick={onLoginClick} onSignupClick={onSignupClick} />
        <Routes>
          <Route path="/" element={<MainPage />} />
        </Routes>
        <NewsCardList
          cardLimit={cardLimit}
          newsData={newsData}
          showMore={showMore}
          cardPageSize={cardPageSize}
        ></NewsCardList>
        <About></About>
        <Footer></Footer>{" "}
      </div>
      <LoginModal
        activeModal={activeModal}
        isOpen={activeModal === "login-user"}
        loginClick={onLoginClick}
        onSecondButtonClick={onSecondButtonClick}
        closeModal={closeModal}
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
