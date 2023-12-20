import { BrowserRouter } from "react-router-dom";
import { Routes, Route, Navigate } from "react-router";
import { useEffect } from "react";
import Home from "./pages/Home";
import "./styles/colors.css";
import StatifyNav from "./components/MainNav";
import Tracks from "./pages/Tracks";

function App() {
  useEffect(() => {
    document.body.classList.add("statify-colors");
    return () => {
      document.body.classList.remove("statify-colors");
    };
  }, []);

  return (
    <BrowserRouter>
      <StatifyNav />
      <div>
        <Routes>
          <Route path="/" element={<Home /> } />
          <Route path="/home" element={<Navigate to="/" />} />
          <Route path="/tracks" element={<Navigate to="/tracks/short_term" />} />
          <Route path="/tracks/:timespan" element={<Tracks />} />
          {/* <Route path="/artists" element={<Artists />} />
          <Route path="/artists/:timespan" element={<Artists />} />
          <Route path="/genres" element={<Genres />} />
          <Route path="/genres/:timespan" element={<Genres />} /> */}
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
