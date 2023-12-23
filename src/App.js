import { BrowserRouter } from "react-router-dom";
import { Routes, Route, Navigate } from "react-router";
import { useEffect } from "react";
import Home from "./pages/Home";
import "./styles/colors.css";
import { Provider } from "react-redux";
import store from "./store/store";
import MainNav from "./components/MainNav";
import Tracks from "./pages/Tracks";
import Artists from "./pages/Artists";

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
        <div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Navigate to="/" />} />
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
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
