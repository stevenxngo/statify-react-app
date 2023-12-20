import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import * as client from "../../auth/client";
import "./index.css";

function MainNav() {
  const links = [
    { text: "Home", path: "/" },
    { text: "Tracks", path: "/tracks" },
    { text: "Artists", path: "/artists" },
    { text: "Genres", path: "/genres" },
  ];

  const [loggedIn, setLoggedIn] = useState(false);

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
  };

  return (
    <nav>
      {links.map((link, index) => (
        <Link key={index} className="navbar-link" to={link.path}>
          {link.text}
        </Link>
      ))}
      <Button onClick={login}>Login</Button>
      <Button onClick={refreshToken}>Refresh Token</Button>
      <Button onClick={logout}>Logout</Button>
    </nav>
  );
}

export default MainNav;
