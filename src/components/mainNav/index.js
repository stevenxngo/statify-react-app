import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Button, Navbar } from "react-bootstrap";
import Nav from "react-bootstrap/Nav";
import * as client from "../../auth/client";
import { isLoggedIn } from "../../services/userServices";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../reducers/userReducer";
import "./styles.css";

function MainNav() {
  const dispatch = useDispatch();
  const { pathname } = useLocation();
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
    { text: "tracks", path: "/tracks" },
    { text: "artists", path: "/artists" },
    { text: "genres", path: "/genres" },
  ];

  return (
    <Navbar fixed="top" className="main-nav d-flex justify-content-between">
      {reducerLoggedIn || loggedIn ? (
        // logged in navbar
        <>
          <Nav className="align-items-center">
            <Navbar.Brand href="/" className="nav-brand m-3">
              statify
            </Navbar.Brand>
            {links.map((link, index) => (
              <Nav.Link
                key={index}
                className={`nav-link p-2 mx-1 ${
                  pathname.includes(link.text) && "active"
                }`}
                href={link.path}
              >
                {link.text}
              </Nav.Link>
            ))}
          </Nav>
          <Button as="Nav.Link" className="nav-btn log-btn m-3" onClick={logout}>
            logout
          </Button>
        </>
      ) : (
        // logged out navbar
        <>
        <Nav className="align-items-center">
          <Navbar.Brand href="/" className="nav-brand m-3">
            statify
          </Navbar.Brand>
          {links.map((link, index) => (
            <Button key={index} className="nav-link nav-btn p-2 mx-1" onClick={login}>
              {link.text}
            </Button>
          ))}
          </Nav>
          <Button className="nav-btn log-btn m-3" onClick={login}>
            login
          </Button>
        </>
      )}
    </Navbar>
  );
}

export default MainNav;
