import React from "react";
import { useLocation } from "react-router-dom";
import { Button, Navbar, Nav } from "react-bootstrap";
import "./styles.css";

function NavLinks({ isLoggedIn, login }) {
  const { pathname } = useLocation();

  const links = [
    { text: "tracks", path: "/tracks" },
    { text: "artists", path: "/artists" },
    { text: "genres", path: "/genres" },
  ];

  return (
    <Nav className="align-items-center">
      <Navbar.Brand
        href="/"
        className="nav-brand m-0 m-sm-3 m-md-3 m-lg-3 m-xl-3 m-xxl-3"
      >
        statify
      </Navbar.Brand>
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