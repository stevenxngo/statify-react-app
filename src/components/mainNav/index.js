import React, { useState, useEffect } from "react";
import { Navbar } from "react-bootstrap";
import * as client from "../../auth/client";
import { isLoggedIn } from "../../services/userServices";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../reducers/userReducer";
import NavLinks from "./NavLinks";
import NavLoginButton from "./NavLoginButton";
import "./styles.css";

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

  return (
    <Navbar
      collapseOnSelect
      expand="sm"
      fixed="top"
      className="main-nav d-flex justify-content-between navbar-dark pt-3 pt-sm-0 pt-md-0 pt-lg-0 pt-xl-0 px-x5 px-xs-0"
    >
      <Navbar.Toggle
        aria-controls="responsive-navbar-nav"
        className="toggle-btn mx-1 mb-2"
      />
      <Navbar.Collapse id="responsive-navbar-nav nav-elements-container nav-links-container pt-1">
        <NavLinks isLoggedIn={reducerLoggedIn || loggedIn} login={login} />
        <NavLoginButton
          isLoggedIn={reducerLoggedIn || loggedIn}
          login={login}
          logout={logout}
        />
      </Navbar.Collapse>
    </Navbar>
  );
}

export default MainNav;
