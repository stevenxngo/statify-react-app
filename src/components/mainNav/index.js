import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import * as client from "../../auth/client";
import { isLoggedIn } from "../../services/userServices";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../reducers/userReducer";
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
    { text: "Tracks", path: "/tracks" },
    { text: "Artists", path: "/artists" },
    // { text: "Genres", path: "/genres" },
  ];

  return (
    <nav>
      {reducerLoggedIn || loggedIn ? (
        <>
          <Link className="navbar-link" to="/">
            Home
          </Link>
          {links.map((link, index) => (
            <Link key={index} className="navbar-link" to={link.path}>
              {link.text}
            </Link>
          ))}
          <span>
            <Button className="log-btn" onClick={logout}>
              Logout
            </Button>
          </span>
        </>
      ) : (
        <>
          <Link className="navbar-link" to="/">
            Home
          </Link>
          {links.map((link, index) => (
            <Button key={index} className="navbar-link" onClick={login}>
              {link.text}
            </Button>
          ))}
          <Button className="log-btn" onClick={login}>
            Login
          </Button>
        </>
      )}
    </nav>
  );
}

export default MainNav;
