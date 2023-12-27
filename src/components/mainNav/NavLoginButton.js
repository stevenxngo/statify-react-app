import React from "react";
import { Button, Nav } from "react-bootstrap";
import "./styles.css";

function NavLoginButton({ isLoggedIn, login, logout }) {
  return (
    <Nav>
      <Button
        className="nav-btn mb-3 mb-sm-0"
        onClick={isLoggedIn ? logout : login}
      >
        {isLoggedIn ? "logout" : "login"}
      </Button>
    </Nav>
  );
}

export default NavLoginButton;
