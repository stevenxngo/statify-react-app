import { useEffect } from "react";
import { Provider } from "react-redux";
import { Routes, Route, Navigate } from "react-router";
import { BrowserRouter } from "react-router-dom";
import store from "./store/store";
import Home from "./pages/Home";
import MainNav from "./components/MainNav";
import Data from "./pages/Data";
import Genres from "./pages/Genres";
import NotFound from "./pages/NotFound";
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
            <Route path="/" element={<Navigate to="/statify-react-app" />} />
            <Route path="/statify-react-app" element={<Home />} />
            <Route path="/statify-react-app/home" element={<Navigate to="/" />} />
            <Route
              path="/statify-react-app/tracks"
              element={<Navigate to="/statify-react-app/tracks/short_term" />}
            />
            <Route path="/statify-react-app/tracks/:timespan" element={<Data type={"track"} />} />
            <Route
              path="/statify-react-app/artists"
              element={<Navigate to="/statify-react-app/artists/short_term" />}
            />
            <Route
              path="/statify-react-app/artists/:timespan"
              element={<Data type={"artist"} />}
            />
            <Route
              path="/statify-react-app/genres"
              element={<Navigate to="/statify-react-app/genres/short_term" />}
            />
            <Route path="/statify-react-app/genres/:timespan" element={<Genres />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Footer />
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
