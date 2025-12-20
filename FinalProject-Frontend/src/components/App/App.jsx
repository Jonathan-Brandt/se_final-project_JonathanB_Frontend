import "./App.css";
import { Route, Routes } from "react-router-dom";

import Header from "../Header/Header";
import MainPage from "../MainPage/MainPage";
import About from "../About/About";
import Footer from "../Footer/Footer";
import NewsCardList from "../NewsCardList/NewsCardList";

function App() {
  const cardData = [
    {
      id: 1,
      imageUrl:
        "https://media.istockphoto.com/id/182820338/photo/blue-crab-on-dock.jpg?s=612x612&w=0&k=20&c=08bMr4A8-IV_FoaQsUSik9wc11SRCQ0wI4kGZT6JDH8=",
      date: "December 19, 2025",
      title: "Placeholder text for Jimbo the crab",
      body: "Ah jeez! It's Jimbo the placeholder crab! That's right, this absolutely meaningless crustacean is on your door steps just straight ding dong ditching this news card into absolute oblivion. At least until I get the api stuf working!",
      source: "joemama",
    },
  ];

  return (
    <div className="page">
      <div className="page__content">
        <div className="content__cover"></div>
        <Header></Header>
        <Routes>
          <Route path="/" element={<MainPage />} />
        </Routes>
        {cardData.map((card) => (
          <NewsCardList
            key={card.id}
            cardImg={card.imageUrl}
            cardDate={card.date}
            cardTitle={card.title}
            cardBody={card.body}
            cardSource={card.source}
          />
        ))}

        <About></About>
        <Footer></Footer>
      </div>
    </div>
  );
}

export default App;
