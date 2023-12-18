import { BrowserRouter } from "react-router-dom";
import { Routes, Route, Navigate } from "react-router";
import { useEffect } from "react";
import Home from "./pages/Home";
import "./styles/colors.css";
import StatifyNav from "./components/mainNav";

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
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
