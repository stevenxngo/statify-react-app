import React from "react";
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

  const login = async () => {
    await client.login();
  };

  const getToken = async () => {
    try {
      await client.retrieveToken();
    } catch (err) {
      console.log(err);
    }
  };

  const logout = async () => {
    await client.logout();
  };

  return (
    <div className="navbar">
      <div className="navbar-links">
        {links.map((link, index) => (
          <Link key={index} className="navbar-link" to={link.path}>
            {link.text}
          </Link>
        ))}
        <Button onClick={login}>Login</Button>
        <Button onClick={getToken}>Get Token</Button>
        <Button onClick={logout}>Logout</Button>
      </div>
    </div>
  );
}

export default MainNav;
