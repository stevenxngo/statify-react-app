import { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import { Routes, Route, Navigate } from "react-router";
import { Provider } from "react-redux";
import Home from "./pages/Home";
import MainNav from "./components/MainNav";
import Tracks from "./pages/Tracks";
import Artists from "./pages/Artists";
import store from "./store/store";
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
        <div className="page-container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Navigate to="/" />} />
            {/* <Route path="/" element={<Navigate to="/home" />} />
            <Route path="/home" element={<Home />} /> */}
            <Route
              path="/tracks"
              element={<Navigate to="/tracks/short_term" />}
            />
            <Route path="/tracks/:timespan" element={<Tracks />} />
            <Route
              path="/artists"
              element={<Navigate to="/artists/short_term" />}
            />
            <Route path="/artists/:timespan" element={<Artists />} />
            {/* <Route path="/genres" element={<Genres />} />
            <Route path="/genres/:timespan" element={<Genres />} /> */}
          </Routes>
          <Footer />
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
