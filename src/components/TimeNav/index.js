import { Navbar, Nav } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import "./styles.css";

function TimeNav(props) {
  const { pathname } = useLocation();
  const type = props.type;

  const links = [
    { text: "last 4 weeks", path: `/${type}/short_term`, key: "short_term" },
    { text: "last 6 months", path: `/${type}/medium_term`, key: "medium_term" },
    { text: "all time", path: `/${type}/long_term`, key: "long_term" },
  ];

  return (
    <Navbar className="pt-0 mb-2">
      <Nav className="nav-fill">
        {links.map((link, index) => (
          <Nav.Link
            key={index}
            className={`time-link pt-2 ${
              pathname.includes(link.key) && "active"
            } col-12 col-sm-4`}
            href={link.path}
          >
            {link.text}
          </Nav.Link>
        ))}
      </Nav>
    </Navbar>
  );
}

export default TimeNav;
