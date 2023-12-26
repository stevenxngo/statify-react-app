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
      className="main-nav navbar-dark pt-0 pb-0 px-0 px-sm-5 px-md-5 px-lg-5 px-xl-5 px-xxl-5"
    >
      <Navbar.Brand
        href="/"
        className="nav-brand m-3 ml-4 pl-2 pl-sm-0 pl-md-0 pl-lg-0 pl-xl-0 pl-xxl-0"
      >
        statify
      </Navbar.Brand>
      <Navbar.Toggle
        aria-controls="responsive-navbar-nav"
        className="toggle-btn m-3"
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
