import "./App.css";
import { Route, Routes } from "react-router-dom";

import Header from "../Header/Header";
import MainPage from "../MainPage/MainPage";
import About from "../About/About";
import Footer from "../Footer/Footer";

function App() {
  return (
    <div className="page">
      <div className="page__content">
        <div className="content__cover"></div>
        <Header></Header>
        <Routes>
          <Route path="/" element={<MainPage />} />
        </Routes>
        <About></About>
        <Footer></Footer>
      </div>
    </div>
  );
}

export default App;
