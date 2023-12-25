import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Button, Navbar, Nav } from "react-bootstrap";
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
    <Navbar
      collapseOnSelect
      expand="sm"
      fixed="top"
      className="main-nav d-flex justify-content-between navbar-dark"
    >
      <Navbar.Toggle
        aria-controls="responsive-navbar-nav"
        className="toggle-btn mx-3 mt-1 mb-2"
      />
      <Navbar.Collapse id="responsive-navbar-nav nav-links-container pt-1">
        {reducerLoggedIn || loggedIn ? (
          // logged in navbar
          <>
            <Nav className="align-items-center">
              <Navbar.Brand
                href="/"
                className="nav-brand m-0 m-sm-3 m-md-3 m-lg-3 m-xl-3 m-xxl-3"
              >
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
            <Nav>
              <Button
                className="nav-btn mb-3 mb-sm-0 mb-md-0 mb-lg-0 mb-xl-0 mb-xxl-0"
                onClick={logout}
              >
                logout
              </Button>
            </Nav>
          </>
        ) : (
          // logged out navbar
          <>
            <Nav className="align-items-center">
              <Navbar.Brand
                href="/"
                className="nav-brand m-0 m-sm-3 m-md-3 m-lg-3 m-xl-3 m-xxl-3"
              >
                statify
              </Navbar.Brand>
              {links.map((link, index) => (
                <Button
                  key={index}
                  className="nav-link nav-btn p-2 mx-1"
                  onClick={login}
                >
                  {link.text}
                </Button>
              ))}
            </Nav>
            <Nav>
              <Button
                className="nav-btn mb-3 mb-sm-0 mb-md-0 mb-lg-0 mb-xl-0 mb-xxl-0"
                onClick={login}
              >
                login
              </Button>
            </Nav>
          </>
        )}
      </Navbar.Collapse>
    </Navbar>
  );
}

export default MainNav;
