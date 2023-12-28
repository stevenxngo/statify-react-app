import { useEffect } from "react";
import { Provider } from "react-redux";
import { Routes, Route, Navigate } from "react-router";
import { BrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import MainNav from "./components/MainNav";
import store from "./store/store";
import Data from "./pages/Data";
import Genres from "./pages/Genres";
import Footer from "./components/Footer";
import "./styles/colors.css";
import "./styles/global.css";

function App() {
  useEffect(() => {
    document.body.classList.add("statify-colors");
    return () => {
      document.body.classList.remove("statify-colors");
    };
  }, []);

  return (
    <Provider store={store}>
      <BrowserRouter>
        <MainNav />
        <div className="page-container px-4 px-sm-5">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Navigate to="/" />} />
            <Route
              path="/tracks"
              element={<Navigate to="/tracks/short_term" />}
            />
            <Route path="/tracks/:timespan" element={<Data type={"track"} />} />
            <Route
              path="/artists"
              element={<Navigate to="/artists/short_term" />}
            />
            <Route
              path="/artists/:timespan"
              element={<Data type={"artist"} />}
            />
            <Route path="/genres" element={<Genres />} />
            <Route path="/genres/:timespan" element={<Genres />} />
          </Routes>
          <Footer />
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
