import "./App.css";
import Header from "../Header/Header";
import MainPage from "../MainPage/MainPage";

function App() {
  return (
    <>
      <div className="page">
        <div className="content__cover">
          <div className="page__content"></div>
        </div>
        <Header></Header>
        <MainPage></MainPage>
      </div>
    </>
  );
}

export default App;
