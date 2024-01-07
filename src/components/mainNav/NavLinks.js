import React from "react";
import { useLocation } from "react-router-dom";
import { Button, Nav } from "react-bootstrap";
import "./styles.css";

function NavLinks({ isLoggedIn, login }) {
  const { pathname } = useLocation();

  const links = [
    { text: "tracks", path: "/statify-react-app/tracks" },
    { text: "artists", path: "/statify-react-app/artists" },
    { text: "genres", path: "/statify-react-app/genres" },
  ];

  return (
    <Nav className="align-items-center">
      {links.map((link, index) =>
        isLoggedIn ? (
          <Nav.Link
            key={index}
            className={`nav-link p-2 mx-1 ${
              pathname.includes(link.text) && "active"
            }`}
            href={link.path}
          >
            {link.text}
          </Nav.Link>
        ) : (
          <Button
            key={index}
            className="nav-link nav-btn p-2 mx-1"
            onClick={login}
          >
            {link.text}
          </Button>
        )
      )}
    </Nav>
  )
}

export default NavLinks;