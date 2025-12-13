import "./App.css";
import Header from "../Header/Header";
import MainPage from "../MainPage/MainPage";

function App() {
  return (
    <>
      <div className="page">
        <div className="page__content">
          <Header></Header>
          <MainPage></MainPage>
        </div>
      </div>
    </>
  );
}

export default App;
