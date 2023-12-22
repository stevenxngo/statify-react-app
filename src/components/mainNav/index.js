import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import * as client from "../../auth/client";
import { isLoggedIn } from "../../services/userServices";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, logoutUser } from "../../reducers/userReducer";
import Login from "../Login";
import "./index.css";

function MainNav() {
  const dispatch = useDispatch();
  const [loggedIn, setLoggedIn] = useState(false);
  const reducerLoggedIn = useSelector((state) => state.userReducer.loggedIn);

  const login = async () => {
    try {
      await client.login();
    } catch (err) {
      console.log(err);
    }
  };

  const refreshToken = async () => {
    try {
      await client.refreshToken();
    } catch (err) {
      console.log(err);
    }
  };

  const logout = async () => {
    await client.logout();
    dispatch(logoutUser());
    setLoggedIn(false);
  };

  useEffect(() => {
    async function fetchAccount() {
      const res = await isLoggedIn();
      setLoggedIn(res);
    }
    fetchAccount();
  }, []);

  const links = [
    { text: "Home", path: "/" },
    { text: "Tracks", path: "/tracks" },
    { text: "Artists", path: "/artists" },
    { text: "Genres", path: "/genres" },
  ];

  return (
    <nav>
      {links.map((link, index) => (
        <Link key={index} className="navbar-link" to={link.path}>
          {link.text}
        </Link>
      ))}
      {reducerLoggedIn || loggedIn ? (
        <span>
          <Button onClick={refreshToken}>Refresh Token</Button>
          <Button onClick={logout}>Logout</Button>
        </span>
      ) : (
        <Button onClick={login}>Login</Button>
      )}
      <p>
        {reducerLoggedIn ? "Logged in from reducer" : "Not logged in from reducer"}
        <br />
        {loggedIn ? "Logged in from state" : "Not logged in from state"}
      </p>
    </nav>
  );
}

export default MainNav;
